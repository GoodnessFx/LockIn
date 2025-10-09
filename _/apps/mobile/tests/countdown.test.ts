import { generateCurriculum, getCurriculumProgress } from '../src/services/ai/curriculum';
import { CurriculumItem } from '../src/store/appStore';

describe('Countdown Logic', () => {
  test('should calculate days remaining correctly', () => {
    const startDate = new Date('2024-01-01');
    const targetDate = new Date('2024-04-07'); // 97 days later
    const now = new Date('2024-02-01'); // 31 days in
    
    const daysElapsed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysRemaining = 97 - daysElapsed;
    
    expect(daysElapsed).toBe(31);
    expect(daysRemaining).toBe(66);
  });

  test('should handle expired countdown', () => {
    const startDate = new Date('2024-01-01');
    const now = new Date('2024-05-01'); // Past the 97-day mark
    
    const daysElapsed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.max(0, 97 - daysElapsed);
    
    expect(daysRemaining).toBe(0);
  });

  test('should calculate battery level correctly', () => {
    const currentDay = 25;
    const totalDays = 97;
    const batteryLevel = Math.max(0, Math.min(100, (currentDay / totalDays) * 100));
    
    expect(batteryLevel).toBeCloseTo(25.77, 1);
  });
});

describe('Curriculum Generator', () => {
  test('should generate curriculum for web-dev niche', () => {
    const curriculum = generateCurriculum('web-dev', 10);
    
    expect(curriculum).toHaveLength(10);
    expect(curriculum[0]).toHaveProperty('id');
    expect(curriculum[0]).toHaveProperty('day', 1);
    expect(curriculum[0]).toHaveProperty('title');
    expect(curriculum[0]).toHaveProperty('description');
    expect(curriculum[0]).toHaveProperty('type');
    expect(curriculum[0]).toHaveProperty('completed', false);
    expect(curriculum[0]).toHaveProperty('estimatedTime');
  });

  test('should generate curriculum for mobile-dev niche', () => {
    const curriculum = generateCurriculum('mobile-dev', 5);
    
    expect(curriculum).toHaveLength(5);
    expect(curriculum[0].title).toContain('React Native');
  });

  test('should handle unknown niche with fallback', () => {
    const curriculum = generateCurriculum('unknown-niche', 3);
    
    expect(curriculum).toHaveLength(3);
    expect(curriculum[0].title).toContain('HTML'); // Should fallback to web-dev
  });

  test('should calculate progress correctly', () => {
    const curriculum: CurriculumItem[] = [
      { id: '1', day: 1, title: 'Task 1', description: 'Desc 1', type: 'learning', completed: true, estimatedTime: 60 },
      { id: '2', day: 2, title: 'Task 2', description: 'Desc 2', type: 'practice', completed: true, estimatedTime: 45 },
      { id: '3', day: 3, title: 'Task 3', description: 'Desc 3', type: 'milestone', completed: false, estimatedTime: 120 },
      { id: '4', day: 4, title: 'Task 4', description: 'Desc 4', type: 'learning', completed: false, estimatedTime: 90 },
    ];

    const progress = getCurriculumProgress(curriculum);
    
    expect(progress.totalTasks).toBe(4);
    expect(progress.completedTasks).toBe(2);
    expect(progress.progressPercentage).toBe(50);
    expect(progress.currentWeek).toBe(1);
    expect(progress.weekProgress).toBe(50);
  });

  test('should handle empty curriculum', () => {
    const progress = getCurriculumProgress([]);
    
    expect(progress.totalTasks).toBe(0);
    expect(progress.completedTasks).toBe(0);
    expect(progress.progressPercentage).toBe(0);
    expect(progress.currentWeek).toBe(0);
    expect(progress.weekProgress).toBe(0);
  });

  test('should calculate week progress correctly', () => {
    const curriculum: CurriculumItem[] = [
      { id: '1', day: 1, title: 'Task 1', description: 'Desc 1', type: 'learning', completed: true, estimatedTime: 60 },
      { id: '2', day: 2, title: 'Task 2', description: 'Desc 2', type: 'practice', completed: true, estimatedTime: 45 },
      { id: '3', day: 3, title: 'Task 3', description: 'Desc 3', type: 'milestone', completed: false, estimatedTime: 120 },
      { id: '4', day: 4, title: 'Task 4', description: 'Desc 4', type: 'learning', completed: false, estimatedTime: 90 },
      { id: '5', day: 8, title: 'Task 5', description: 'Desc 5', type: 'learning', completed: true, estimatedTime: 60 },
      { id: '6', day: 9, title: 'Task 6', description: 'Desc 6', type: 'practice', completed: false, estimatedTime: 45 },
    ];

    const progress = getCurriculumProgress(curriculum);
    
    expect(progress.currentWeek).toBe(2); // Day 9 is in week 2
    expect(progress.weekProgress).toBe(50); // 1 out of 2 tasks completed in week 2
  });
});

describe('Streak Logic', () => {
  test('should calculate streak correctly', () => {
    const completedDays = [1, 2, 3, 5, 6, 7]; // Missing day 4
    const currentDay = 7;
    
    // Find the longest consecutive streak ending at current day
    let streak = 0;
    for (let day = currentDay; day >= 1; day--) {
      if (completedDays.includes(day)) {
        streak++;
      } else {
        break;
      }
    }
    
    expect(streak).toBe(3); // Days 5, 6, 7
  });

  test('should handle no streak', () => {
    const completedDays: number[] = [];
    const currentDay = 5;
    
    let streak = 0;
    for (let day = currentDay; day >= 1; day--) {
      if (completedDays.includes(day)) {
        streak++;
      } else {
        break;
      }
    }
    
    expect(streak).toBe(0);
  });

  test('should handle perfect streak', () => {
    const completedDays = [1, 2, 3, 4, 5];
    const currentDay = 5;
    
    let streak = 0;
    for (let day = currentDay; day >= 1; day--) {
      if (completedDays.includes(day)) {
        streak++;
      } else {
        break;
      }
    }
    
    expect(streak).toBe(5);
  });
});