-- 1. Tabla de Perfiles (Si no existe)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT,
    display_name TEXT,
    role TEXT DEFAULT 'user',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    stripe_customer_id TEXT
);

-- Habilitar RLS en profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Tabla de Progreso y Gamificación
CREATE TABLE IF NOT EXISTS public.user_progress (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_activity TIMESTAMPTZ,
    badges JSONB DEFAULT '[]'::jsonb,
    completed_modules JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own progress." ON public.user_progress FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own progress." ON public.user_progress FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own progress." ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = id);

-- 3. Tabla de Logs del Panel de Administración
CREATE TABLE IF NOT EXISTS public.admin_logs (
    id SERIAL PRIMARY KEY,
    admin_id UUID REFERENCES auth.users(id),
    admin_name TEXT,
    action TEXT NOT NULL,
    type TEXT DEFAULT '🛡️',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view logs" ON public.admin_logs FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'superadmin'))
);
CREATE POLICY "Admins can insert logs" ON public.admin_logs FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'superadmin'))
);

-- 4. Tabla de Configuración de la Plataforma
CREATE TABLE IF NOT EXISTS public.platform_settings (
    id TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_by UUID REFERENCES auth.users(id),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Everyone can view platform settings" ON public.platform_settings FOR SELECT USING (true);
CREATE POLICY "Admins can insert platform settings" ON public.platform_settings FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'superadmin'))
);
CREATE POLICY "Admins can update platform settings" ON public.platform_settings FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'superadmin'))
);

-- Insertar configuración por defecto de redes sociales
INSERT INTO public.platform_settings (id, value) 
VALUES ('social_links', '{"telegram": "https://t.me/TuGrupo", "whatsapp": "https://chat.whatsapp.com/TuGrupo"}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 5. Tabla para posts de Comunidad / Foro
CREATE TABLE IF NOT EXISTS public.forum_posts (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    author TEXT,
    text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Everyone can view forum posts" ON public.forum_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can post" ON public.forum_posts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 6. Tabla de Suscripciones (Stripe)
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
    user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
    plan_id TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    stripe_subscription_id TEXT,
    current_period_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own subscriptions" ON public.user_subscriptions FOR SELECT USING (auth.uid() = user_id);
