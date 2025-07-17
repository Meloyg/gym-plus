'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

interface AddExerciseDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

export function AddExerciseDialog({ open, onClose, onAdd }: AddExerciseDialogProps) {
  const [exerciseName, setExerciseName] = useState('');

  const handleAdd = () => {
    if (exerciseName.trim()) {
      onAdd(exerciseName.trim());
      setExerciseName('');
      onClose();
    }
  };

  const handleClose = () => {
    setExerciseName('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Exercise</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Exercise Name"
          fullWidth
          variant="outlined"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAdd();
            }
          }}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={handleAdd}
          variant="contained"
          disabled={!exerciseName.trim()}
        >
          Add Exercise
        </Button>
      </DialogActions>
    </Dialog>
  );
}