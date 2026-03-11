-- ============================================
-- SQL para la tabla PROFILES en Supabase
-- Ejecutar en: Supabase Dashboard -> SQL Editor
-- ============================================

-- 1. Crear la tabla profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'superadmin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Habilitar Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de seguridad

-- Usuarios leen su propio perfil
CREATE POLICY "Users read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Usuarios editan su propio perfil (NO pueden cambiar su rol)
CREATE POLICY "Users update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Usuarios insertan su propio perfil
CREATE POLICY "Users insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Admins y superadmins pueden ver todos los perfiles
CREATE POLICY "Admins read all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'superadmin')
    )
  );

-- Superadmins pueden actualizar cualquier perfil (cambiar roles)
CREATE POLICY "Superadmins update all profiles"
  ON profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'superadmin'
    )
  );

-- ============================================
-- 4. Crear perfil automáticamente al registrarse
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger que se ejecuta cada vez que se registra un usuario
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 5. Tabla user_progress (si no existe)
-- ============================================
CREATE TABLE IF NOT EXISTS user_progress (
  user_id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  data_json JSONB DEFAULT '{"lessons":[],"projects":[],"xp":0,"level":1,"streak":0,"badges":["Explorador","Iniciado"],"completedLessons":[],"completedProjects":[],"lastActivity":null}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own progress"
  ON user_progress FOR ALL
  USING (auth.uid() = user_id);

-- ============================================
-- 6. Configuración de Plataforma (Redes y Links Dinámicos)
-- ============================================
CREATE TABLE IF NOT EXISTS platform_settings (
  id TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users
);

ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read platform settings" 
  ON platform_settings FOR SELECT USING (true);

CREATE POLICY "Superadmins can update platform settings" 
  ON platform_settings FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'superadmin')
  );

-- Insertar configuración inicial
INSERT INTO platform_settings (id, value) 
VALUES ('social_links', '{"facebook": "#", "instagram": "#", "tiktok": "#", "github": "#", "discord": "#", "whatsapp": "#"}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 7. Tabla Suscripciones de Usuarios (Planes)
-- ============================================
CREATE TABLE IF NOT EXISTS user_subscriptions (
  user_id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  plan_id TEXT NOT NULL DEFAULT 'free',
  status TEXT NOT NULL DEFAULT 'active',
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own subscription" 
  ON user_subscriptions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins manage all subscriptions" 
  ON user_subscriptions FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'superadmin'))
  );

-- ============================================
-- 8. Para hacerte SUPERADMIN (ejecutar UNA VEZ con tu correo)
-- ============================================
-- UPDATE profiles SET role = 'superadmin' WHERE email = 'antoniocorporan40@gmail.com';
