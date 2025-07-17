export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Set {
  id: string;
  reps: number;
  weight?: number;
  completed: boolean;
  createdAt: Date;
}

export interface WorkoutSession {
  id: string;
  date: Date;
  exercises: Exercise[];
  duration?: number;
}