'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { Exercise, Set } from '@/types/exercise';

interface ExerciseCardProps {
  exercise: Exercise;
  onDelete: (exerciseId: string) => void;
  onAddSet: (exerciseId: string, reps: number, weight?: number) => void;
  onUpdateSet: (exerciseId: string, setId: string, updates: Partial<Set>) => void;
  onDeleteSet: (exerciseId: string, setId: string) => void;
}

export function ExerciseCard({
  exercise,
  onDelete,
  onAddSet,
  onUpdateSet,
  onDeleteSet,
}: ExerciseCardProps) {
  const [showAddSetDialog, setShowAddSetDialog] = useState(false);
  const [newSetReps, setNewSetReps] = useState('');
  const [newSetWeight, setNewSetWeight] = useState('');

  const handleAddSet = () => {
    const reps = parseInt(newSetReps);
    const weight = newSetWeight ? parseFloat(newSetWeight) : undefined;

    if (reps > 0) {
      onAddSet(exercise.id, reps, weight);
      setNewSetReps('');
      setNewSetWeight('');
      setShowAddSetDialog(false);
    }
  };

  const toggleSetComplete = (setId: string, completed: boolean) => {
    onUpdateSet(exercise.id, setId, { completed: !completed });
  };

  const completedSets = exercise.sets.filter(set => set.completed).length;
  const totalSets = exercise.sets.length;

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" component="h2">
              {exercise.name}
            </Typography>
            <IconButton
              onClick={() => onDelete(exercise.id)}
              color="error"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Box>

          {totalSets > 0 && (
            <Box mb={2}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Progress: {completedSets}/{totalSets} sets completed
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {exercise.sets.map((set, index) => (
                  <Chip
                    key={set.id}
                    label={`Set ${index + 1}: ${set.reps} reps${set.weight ? ` @ ${set.weight}kg` : ''}`}
                    color={set.completed ? 'primary' : 'default'}
                    onClick={() => toggleSetComplete(set.id, set.completed)}
                    onDelete={() => onDeleteSet(exercise.id, set.id)}
                    icon={set.completed ? <CheckIcon /> : <EditIcon />}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {totalSets === 0 && (
            <Typography variant="body2" color="text.secondary">
              No sets recorded. Add your first set!
            </Typography>
          )}
        </CardContent>

        <CardActions>
          <Button
            startIcon={<AddIcon />}
            onClick={() => setShowAddSetDialog(true)}
            variant="contained"
            size="small"
          >
            Add Set
          </Button>
        </CardActions>
      </Card>

      <Dialog open={showAddSetDialog} onClose={() => setShowAddSetDialog(false)}>
        <DialogTitle>Add Set to {exercise.name}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField
                label="Reps"
                type="number"
                value={newSetReps}
                onChange={(e) => setNewSetReps(e.target.value)}
                fullWidth
                required
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Weight (kg)"
                type="number"
                value={newSetWeight}
                onChange={(e) => setNewSetWeight(e.target.value)}
                fullWidth
                inputProps={{ min: 0, step: 0.5 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddSetDialog(false)}>Cancel</Button>
          <Button
            onClick={handleAddSet}
            variant="contained"
            disabled={!newSetReps || parseInt(newSetReps) <= 0}
          >
            Add Set
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}