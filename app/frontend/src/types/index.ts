export type Dimension = 'intellectual' | 'physical' | 'financial' | 'environmental' | 'vocational' | 'social' | 'emotional' | 'spiritual';
export type Status = 'active' | 'backlog' | 'completed';

export interface User {
    id: string;
    username: string;
    display_name?: string;
    email?: string;
    openai_api_key?: string;
    level?: number;
    stats?: {
        quests_active: number;
        quests_completed: number;
        achievements_unlocked: number;
    };
}

export interface Quest {
    id: string;
    title: string;
    dimension?: Dimension | null;
    status: Status;
    tags: string[];
    created_at: string;
    progress: number;
    victory_condition?: string;
    is_hidden?: boolean;
    due_date?: string;
}

export interface QuestCreate {
    title: string;
    dimension?: Dimension | null;
    status?: Status;
    tags?: string[];
    victory_condition?: string;
    due_date?: string;
}

export interface Achievement {
    id: string;
    title: string;
    context: string;
    date_completed: string;
    dimension?: Dimension | null;
    image_url?: string;
    ai_description?: string;
    ai_reward?: string;
    quest_id?: string;
    is_hidden?: boolean;
}

export interface AchievementCreate {
    title: string;
    context: string;
    date_completed: string;
    dimension?: Dimension | null;
    image_url?: string;
    ai_description?: string;
    ai_reward?: string;
    quest_id?: string;
    use_genai?: boolean;
}
