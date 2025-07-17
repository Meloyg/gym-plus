import { useCallback } from 'react';
import { Exercise, Set } from '@/types/exercise';
import { useLocalStorage } from './useLocalStorage';

export function useExercises() {
  const [exercises, setExercises] = useLocalStorage<Exercise[]>('gym-plus-exercises', []);

  const addExercise = useCallback((name: string) => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: name.trim(),
      sets: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setExercises(prev => [...prev, newExercise]);
    return newExercise;
  }, [setExercises]);

  const deleteExercise = useCallback((exerciseId: string) => {
    setExercises(prev => prev.filter(ex => ex.id !== exerciseId));
  }, [setExercises]);

  const addSet = useCallback((exerciseId: string, reps: number, weight?: number) => {
    const newSet: Set = {
      id: Date.now().toString(),
      reps,
      weight,
      completed: false,
      createdAt: new Date(),
    };

    setExercises(prev => prev.map(ex => 
      ex.id === exerciseId 
        ? { ...ex, sets: [...ex.sets, newSet], updatedAt: new Date() }
        : ex
    ));
  }, [setExercises]);

  const updateSet = useCallback((exerciseId: string, setId: string, updates: Partial<Set>) => {
    setExercises(prev => prev.map(ex => 
      ex.id === exerciseId 
        ? { 
            ...ex, 
            sets: ex.sets.map(set => 
              set.id === setId ? { ...set, ...updates } : set
            ),
            updatedAt: new Date()
          }
        : ex
    ));
  }, [setExercises]);

  const deleteSet = useCallback((exerciseId: string, setId: string) => {
    setExercises(prev => prev.map(ex => 
      ex.id === exerciseId 
        ? { 
            ...ex, 
            sets: ex.sets.filter(set => set.id !== setId),
            updatedAt: new Date()
          }
        : ex
    ));
  }, [setExercises]);

  return {
    exercises,
    addExercise,
    deleteExercise,
    addSet,
    updateSet,
    deleteSet,
  };
}