import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';
import { getAdminPassword } from '../db/dbStore';

export default function AdminLoginDialog({ open, onClose, onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const result = await getAdminPassword();
    if (result.success) {
      const { password: storedPassword, expiresAt } = result.data;
      const now = new Date();

      // Optional: check expiry
      if (new Date(expiresAt) < now) {
        setError('Password expired. Please contact admin.');
        return;
      }

      if (password === storedPassword) {
        setError('');
        onSuccess();
        onClose();
      } else {
        setError('Incorrect password');
      }
    } else {
      setError('Unable to fetch password from server');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Admin Authentication</DialogTitle>
      <DialogContent>
        <TextField
          label="Enter Password"
          fullWidth
          margin="dense"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={onClose}>Cancel</Button> */}
        <Button onClick={()=> console.log(getAdminPassword())}>Cancel</Button>
        <Button onClick={handleLogin} variant="contained">Login</Button>
      </DialogActions>
    </Dialog>
  );
}
