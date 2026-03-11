// Gamification Engine logic

// Level thresholds
// Level 1: 0 XP
// Level 2: 500 XP
// Level 3: 1200 XP
// Level 4: 2500 XP
// Level 5: 5000 XP
// Level 6: 10000 XP
export const LEVEL_THRESHOLDS = [0, 500, 1200, 2500, 5000, 10000];
export const MAX_LEVEL = 6;

// calculate level based on XP
export const calculateLevel = (xp) => {
    let currentLevel = 1;
    for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
        if (xp >= LEVEL_THRESHOLDS[i]) {
            currentLevel = i + 1;
        } else {
            break;
        }
    }
    return currentLevel;
};

// Next level target XP
export const getNextLevelTarget = (level) => {
    if (level >= MAX_LEVEL) return LEVEL_THRESHOLDS[MAX_LEVEL - 1];
    return LEVEL_THRESHOLDS[level];
};

// Check streaks
// Returns updated streak count and if it should be updated
export const processStreak = (lastActivityDateString, currentStreak) => {
    if (!lastActivityDateString) return { streak: 1, updated: true };

    const lastDate = new Date(lastActivityDateString);
    const today = new Date();
    
    // Normalize to midnight for accurate day comparison
    const lastDay = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
    const currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const diffTime = Math.abs(currentDay - lastDay);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if (diffDays === 0) {
        // Same day, no streak change
        return { streak: currentStreak || 1, updated: false };
    } else if (diffDays === 1) {
        // Next consecutive day, streak + 1
        return { streak: (currentStreak || 0) + 1, updated: true };
    } else {
        // Missed a day, reset streak to 1
        return { streak: 1, updated: true };
    }
};

// Badges definitions
export const BADGE_DEFINITIONS = {
    'Explorador': { description: 'Inició su primera lección.', xpReward: 50 },
    'Iniciado': { description: 'Completó un módulo.', xpReward: 100 },
    'Estudiante Frecuente': { description: 'Racha de 3 días.', xpReward: 150 },
    'Ciber Ninja': { description: 'Alcanzó el nivel 3.', xpReward: 200 },
    'Hacker Ético': { description: 'Racha de 7 días.', xpReward: 300 },
    'Maestro': { description: 'Alcanzó el Nivel 6.', xpReward: 1000 }
};

// Evaluate badges based on current progress
export const evaluateBadges = (currentProgress) => {
    const earnedBadges = [...(currentProgress.badges || [])];
    let newBadgesEarned = [];
    let xpBonus = 0;

    const tryAddBadge = (name) => {
        if (!earnedBadges.includes(name)) {
            earnedBadges.push(name);
            newBadgesEarned.push(name);
            xpBonus += BADGE_DEFINITIONS[name].xpReward;
        }
    };

    if (currentProgress.completedLessons?.length >= 1) {
        tryAddBadge('Explorador');
    }
    if (Object.keys(currentProgress.completedProjects || {}).length >= 1) {
         tryAddBadge('Iniciado');
    }
    if (currentProgress.streak >= 3) tryAddBadge('Estudiante Frecuente');
    if (currentProgress.streak >= 7) tryAddBadge('Hacker Ético');
    if (currentProgress.level >= 3) tryAddBadge('Ciber Ninja');
    if (currentProgress.level >= 6) tryAddBadge('Maestro');

    return { earnedBadges, newBadgesEarned, xpBonus };
};
