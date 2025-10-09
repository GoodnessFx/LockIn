import { API_CONFIG } from '../../config/constants';
import { apiService } from '../api/api';

export interface AIContext {
  userProfile?: any;
  progress?: any;
  curriculum?: any;
  currentTask?: any;
}

export interface AIResponse {
  message: string;
  suggestions?: string[];
  shouldSpeak?: boolean;
  action?: string;
}

class AIService {
  private isOnline: boolean = true;

  constructor() {
    this.checkConnectivity();
  }

  private async checkConnectivity(): Promise<void> {
    try {
      this.isOnline = await apiService.healthCheck();
    } catch {
      this.isOnline = false;
    }
  }

  // Main AI chat method
  async chat(prompt: string, context?: AIContext): Promise<AIResponse> {
    try {
      if (this.isOnline) {
        const response = await apiService.askAI(prompt, context);
        if (response.success && response.data) {
          return this.parseAIResponse(response.data);
        }
      }
      
      // Fallback to offline responses
      return this.getOfflineResponse(prompt, context);
    } catch (error) {
      console.error('AI Service Error:', error);
      return this.getOfflineResponse(prompt, context);
    }
  }

  // Generate curriculum using AI
  async generateCurriculum(niche: string, userGoal?: string): Promise<any[]> {
    try {
      if (this.isOnline) {
        const response = await apiService.generateCurriculum(niche);
        if (response.success && response.data) {
          return response.data;
        }
      }
      
      // Fallback to local generation
      return this.generateLocalCurriculum(niche);
    } catch (error) {
      console.error('Curriculum Generation Error:', error);
      return this.generateLocalCurriculum(niche);
    }
  }

  // Get motivational messages
  async getMotivation(context: AIContext): Promise<AIResponse> {
    const prompts = [
      "Give me a motivational message for someone on day {day} of their {niche} learning journey",
      "I need encouragement for someone who has completed {completed} tasks out of {total}",
      "Motivate someone with a {streak} day streak in their learning journey"
    ];

    const prompt = prompts[Math.floor(Math.random() * prompts.length)]
      .replace('{day}', context.progress?.currentDay || '1')
      .replace('{niche}', context.userProfile?.niche || 'learning')
      .replace('{completed}', context.progress?.completedTasks?.length || '0')
      .replace('{total}', context.curriculum?.length || '1')
      .replace('{streak}', context.progress?.streak || '0');

    return this.chat(prompt, context);
  }

  // Get task explanation
  async explainTask(task: any, context: AIContext): Promise<AIResponse> {
    const prompt = `Explain this learning task in simple terms: "${task.title}". Description: "${task.description}". 
    The user is learning ${context.userProfile?.niche || 'programming'} and is on day ${context.progress?.currentDay || 1} of their journey.`;

    return this.chat(prompt, context);
  }

  // Get recovery suggestions
  async getRecoverySuggestions(context: AIContext): Promise<AIResponse> {
    const prompt = `The user has missed ${context.progress?.missedDays?.length || 0} days in their ${context.userProfile?.niche || 'learning'} journey. 
    They're on day ${context.progress?.currentDay || 1} and have completed ${context.progress?.completedTasks?.length || 0} tasks. 
    Give them a personalized recovery plan with 3 actionable steps.`;

    return this.chat(prompt, context);
  }

  // Private helper methods
  private parseAIResponse(data: any): AIResponse {
    if (typeof data === 'string') {
      return {
        message: data,
        shouldSpeak: true,
      };
    }

    return {
      message: data.message || data.response || 'I understand. How can I help you further?',
      suggestions: data.suggestions || [],
      shouldSpeak: data.shouldSpeak !== false,
      action: data.action,
    };
  }

  private getOfflineResponse(prompt: string, context?: AIContext): AIResponse {
    const lowerPrompt = prompt.toLowerCase();

    // Motivational responses
    if (lowerPrompt.includes('motivation') || lowerPrompt.includes('encourage')) {
      return {
        message: "You're doing great! Every step forward counts. Keep pushing through - your future self will thank you! 💪",
        shouldSpeak: true,
        suggestions: ['Continue with today\'s task', 'Take a short break', 'Review your progress']
      };
    }

    // Task explanation
    if (lowerPrompt.includes('explain') || lowerPrompt.includes('what is')) {
      return {
        message: "This task is designed to help you build practical skills. Take it step by step, and don't hesitate to research additional resources if needed.",
        shouldSpeak: true,
        suggestions: ['Start with the basics', 'Look for examples online', 'Ask for help if stuck']
      };
    }

    // Recovery suggestions
    if (lowerPrompt.includes('recovery') || lowerPrompt.includes('missed')) {
      return {
        message: "Don't worry about missed days - focus on getting back on track. Start with smaller tasks to rebuild momentum.",
        shouldSpeak: true,
        suggestions: ['Complete 2 micro-tasks today', 'Focus on the most important tasks', 'Set smaller daily goals']
      };
    }

    // General responses
    const generalResponses = [
      "I'm here to help you stay on track with your learning journey. What would you like to work on today?",
      "Great question! Let's break this down into manageable steps.",
      "You're making progress every day. Keep up the excellent work!",
      "Remember, consistency is key. Even small steps add up to big results.",
    ];

    const randomResponse = generalResponses[Math.floor(Math.random() * generalResponses.length)];

    return {
      message: randomResponse,
      shouldSpeak: true,
      suggestions: ['Continue learning', 'Take a break', 'Review progress']
    };
  }

  private generateLocalCurriculum(niche: string): any[] {
    // This is a fallback - in production, you'd want more sophisticated local generation
    const baseTasks = [
      { title: 'Introduction to ' + niche, description: 'Learn the fundamentals', type: 'learning', estimatedTime: 60 },
      { title: 'Practice Exercise', description: 'Apply what you learned', type: 'practice', estimatedTime: 45 },
      { title: 'Build Something', description: 'Create a small project', type: 'milestone', estimatedTime: 120 },
    ];

    return baseTasks.map((task, index) => ({
      id: `local-${niche}-${index}`,
      day: index + 1,
      ...task,
      completed: false,
    }));
  }

  // Update connectivity status
  async updateConnectivity(): Promise<void> {
    await this.checkConnectivity();
  }
}

// Export singleton instance
export const aiService = new AIService();
