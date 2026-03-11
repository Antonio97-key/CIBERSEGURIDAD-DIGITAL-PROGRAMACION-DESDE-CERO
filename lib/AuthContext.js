import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({
        display_name: '',
        bio: '',
        avatar_url: '',
        role: 'user'
    });
    const [progress, setProgress] = useState({
        lessons: [],
        projects: [],
        xp: 0,
        level: 1,
        streak: 0,
        badges: ['Explorador', 'Iniciado'],
        completedLessons: [],
        completedProjects: [],
        lastActivity: null
    });

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            const u = session?.user ?? null;
            setUser(u);
            if (u) {
                fetchProgress(u.id);
                fetchProfile(u.id, u.email);
            }
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            const u = session?.user ?? null;
            setUser(u);
            if (u) {
                fetchProgress(u.id);
                fetchProfile(u.id, u.email);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (userId, email) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();
            
            if (data) {
                setProfile({
                    display_name: data.display_name || email?.split('@')[0] || '',
                    bio: data.bio || '',
                    avatar_url: data.avatar_url || '',
                    role: data.role || 'user'
                });
            } else {
                // Profile table doesn't exist or no row yet — use defaults
                setProfile({
                    display_name: email?.split('@')[0] || '',
                    bio: '',
                    avatar_url: '',
                    role: 'user'
                });
            }
        } catch (err) {
            // Table might not exist yet, use defaults
            setProfile({
                display_name: email?.split('@')[0] || '',
                bio: '',
                avatar_url: '',
                role: 'user'
            });
        }
    };

    const updateProfile = async (newProfileData) => {
        if (!user) return;
        const updated = { ...profile, ...newProfileData };
        setProfile(updated);

        try {
            await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    display_name: updated.display_name,
                    bio: updated.bio,
                    avatar_url: updated.avatar_url,
                    role: updated.role
                });
        } catch (err) {
            console.error('Error updating profile:', err);
        }
    };

    const fetchProgress = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('user_progress')
                .select('*')
                .eq('user_id', userId)
                .single();
            
            if (data && data.data_json) {
                setProgress(prev => ({ ...prev, ...data.data_json }));
            }
        } catch (err) {
            // Table might not exist yet, keep defaults
        }
    };

    const updateProgress = async (newData) => {
        if (!user) return;
        const updated = { ...progress, ...newData, lastActivity: new Date().toISOString() };
        setProgress(updated);
        
        try {
            await supabase
                .from('user_progress')
                .upsert({ 
                    user_id: user.id, 
                    data_json: updated,
                    updated_at: new Date().toISOString()
                });
        } catch (err) {
            console.error('Error updating progress:', err);
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setProfile({ display_name: '', bio: '', avatar_url: '', role: 'user' });
        setProgress({ lessons: [], projects: [], xp: 0, level: 1, streak: 0, badges: ['Explorador', 'Iniciado'], completedLessons: [], completedProjects: [], lastActivity: null });
    };

    return (
        <AuthContext.Provider value={{ user, signOut, loading, profile, updateProfile, progress, updateProgress }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
