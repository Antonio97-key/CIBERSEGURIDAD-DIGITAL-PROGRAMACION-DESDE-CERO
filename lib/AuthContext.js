import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';
import { processStreak, calculateLevel, evaluateBadges } from './gamification';

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
        quizzes: [],
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

    // Superadmin emails - these always get superadmin role even without profiles table
    const SUPERADMIN_EMAILS = ['antoniocorporan40@gmail.com'];

    const getDefaultRole = (email) => {
        return SUPERADMIN_EMAILS.includes(email?.toLowerCase()) ? 'superadmin' : 'user';
    };

    const fetchProfile = async (userId, email) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();
            
            if (data) {
                // If email is in superadmin list, always force superadmin regardless of DB
                const role = SUPERADMIN_EMAILS.includes(email?.toLowerCase()) 
                    ? 'superadmin' 
                    : (data.role || 'user');
                setProfile({
                    display_name: data.display_name || email?.split('@')[0] || '',
                    bio: data.bio || '',
                    avatar_url: data.avatar_url || '',
                    role: role
                });
            } else {
                setProfile({
                    display_name: email?.split('@')[0] || '',
                    bio: '',
                    avatar_url: '',
                    role: getDefaultRole(email)
                });
            }
        } catch (err) {
            // Table might not exist yet, use defaults with superadmin check
            setProfile({
                display_name: email?.split('@')[0] || '',
                bio: '',
                avatar_url: '',
                role: getDefaultRole(email)
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
        let updated = { ...progress, ...newData };

        // Gamification evaluation
        const streakData = processStreak(progress.lastActivity, progress.streak);
        updated.streak = streakData.streak;
        
        const badgeData = evaluateBadges(updated);
        if (badgeData.newBadgesEarned.length > 0) {
            updated.badges = badgeData.earnedBadges;
            updated.xp = (updated.xp || 0) + badgeData.xpBonus;
        }
        
        updated.level = calculateLevel(updated.xp || 0);
        updated.lastActivity = new Date().toISOString();

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
        setProgress({ 
            lessons: [], 
            projects: [], 
            quizzes: [],
            xp: 0, 
            level: 1, 
            streak: 0, 
            badges: ['Explorador', 'Iniciado'], 
            completedLessons: [], 
            completedProjects: [], 
            completedQuizzes: [],
            lastActivity: null 
        });
    };

    return (
        <AuthContext.Provider value={{ user, signOut, loading, profile, updateProfile, progress, updateProgress }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
