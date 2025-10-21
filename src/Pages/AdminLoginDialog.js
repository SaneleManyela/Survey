// src/Pages/AdminLoginDialog.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { getAdminPassword } from '../db/dbStore.js';


export default function AdminLoginDialog({ open, onClose, onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Fetch the current password from Firestore
      const doc = await getAdminPassword();
      console.log('Fetched admin password document:', doc);
      const adminPassword = doc.exists ? doc.data().value : null;

      if (password === adminPassword) {
        setError('');
        onSuccess(); // navigate to /Admin
        onClose();
      } else {
        setError('Incorrect password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Admin Login</DialogTitle>
      <DialogContent>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="dense"
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleLogin} variant="contained">Login</Button>
      </DialogActions>
    </Dialog>
  );
}
