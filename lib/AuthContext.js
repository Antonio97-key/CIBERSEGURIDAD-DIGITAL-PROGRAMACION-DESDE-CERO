import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState({
        lessons: [],
        projects: [],
        xp: 0,
        level: 1
    });

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            const user = session?.user ?? null;
            setUser(user);
            if (user) fetchProgress(user.id);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            const user = session?.user ?? null;
            setUser(user);
            if (user) fetchProgress(user.id);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProgress = async (userId) => {
        const { data, error } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', userId)
            .single();
        
        if (data) setProgress(data.data_json);
    };

    const updateProgress = async (newData) => {
        if (!user) return;
        const updated = { ...progress, ...newData };
        setProgress(updated);
        
        await supabase
            .from('user_progress')
            .upsert({ 
                user_id: user.id, 
                data_json: updated,
                updated_at: new Date().toISOString()
            });
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setProgress({ lessons: [], projects: [], xp: 0, level: 1 });
    };

    return (
        <AuthContext.Provider value={{ user, signOut, loading, progress, updateProgress }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
