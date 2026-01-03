
export const MOTIVATIONAL_MESSAGES = [
  "Day 1 of your 97-day transformation! You're becoming unstoppable!",
  "Your commitment battery is charged! Every action builds your future self!",
  "Growth happens in the discomfort zone. You're exactly where you need to be!",
  "Small consistent actions compound into extraordinary results. Keep building!",
  "Your future self is counting on today's version of you. Make it count!",
  "Every expert was once a beginner who refused to give up. You're on the right path!",
  "The compound effect of daily progress is your superpower. Use it!",
  "You're not just learning skills, you're building character. Stay locked in!"
];

export const getCoursesForNiche = (niche: string) => {
  const n = (niche || '').toLowerCase();
  if (n.includes('photo')) {
    return [
      { id: 'p1', title: 'Photography Basics: Exposure, Aperture, ISO', progress: 30, totalLessons: 12, completedLessons: 4 },
      { id: 'p2', title: 'Composition Mastery: Rule of Thirds & Leading Lines', progress: 60, totalLessons: 10, completedLessons: 6 },
      { id: 'p3', title: 'Portrait Lighting: Natural vs. Studio', progress: 10, totalLessons: 8, completedLessons: 1 },
    ];
  }
  if (n.includes('design')) {
    return [
      { id: 'd1', title: 'UI Foundations: Color, Typography, Spacing', progress: 40, totalLessons: 15, completedLessons: 6 },
      { id: 'd2', title: 'Figma Workflow: Components & Auto Layout', progress: 25, totalLessons: 20, completedLessons: 5 },
      { id: 'd3', title: 'UX Research: Personas & User Interviews', progress: 80, totalLessons: 12, completedLessons: 10 },
    ];
  }
  if (n.includes('coding') || n.includes('developer') || n.includes('program')) {
    return [
      { id: 'c1', title: 'JavaScript Essentials', progress: 55, totalLessons: 25, completedLessons: 14 },
      { id: 'c2', title: 'React Native Fundamentals', progress: 75, totalLessons: 20, completedLessons: 15 },
      { id: 'c3', title: 'State Management: Zustand & Patterns', progress: 35, totalLessons: 10, completedLessons: 3 },
    ];
  }
  return [
    { id: 'g1', title: 'Focus & Deep Work Routines', progress: 70, totalLessons: 10, completedLessons: 7 },
    { id: 'g2', title: 'Personal Growth: Habits & Systems', progress: 20, totalLessons: 8, completedLessons: 2 },
    { id: 'g3', title: 'Creativity Warmups & Idea Generation', progress: 50, totalLessons: 12, completedLessons: 6 },
  ];
};
