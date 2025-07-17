'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Fab,
  AppBar,
  Toolbar,
  Alert,
} from '@mui/material';
import { Add as AddIcon, FitnessCenter } from '@mui/icons-material';
import { useExercises } from '@/hooks/useExercises';
import { ExerciseCard } from '@/components/ExerciseCard';
import { AddExerciseDialog } from '@/components/AddExerciseDialog';

export default function Home() {
  const {
    exercises,
    addExercise,
    deleteExercise,
    addSet,
    updateSet,
    deleteSet,
  } = useExercises();
  
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <FitnessCenter sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Gym Plus
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Your Workouts
        </Typography>

        {exercises.length === 0 ? (
          <Alert severity="info" sx={{ mb: 3 }}>
            No exercises yet. Tap the + button to add your first exercise!
          </Alert>
        ) : (
          <Box>
            {exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onDelete={deleteExercise}
                onAddSet={addSet}
                onUpdateSet={updateSet}
                onDeleteSet={deleteSet}
              />
            ))}
          </Box>
        )}

        <Fab
          color="primary"
          aria-label="add exercise"
          onClick={() => setShowAddDialog(true)}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
          }}
        >
          <AddIcon />
        </Fab>

        <AddExerciseDialog
          open={showAddDialog}
          onClose={() => setShowAddDialog(false)}
          onAdd={addExercise}
        />
      </Container>
    </Box>
  );
}
