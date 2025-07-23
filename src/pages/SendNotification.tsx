import { Alert, Button, MenuItem, Snackbar, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Category } from '../model/Category.model';

export default function SendNotification() {
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('SPORTS');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  // Validation state
  const [messageError, setMessageError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await api.get('/categories');
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    // Validate message is not empty or only whitespace
    if (!message.trim()) {
      setMessageError(true);
      return;
    }

    try {
      await api.post('/notifications', {
        message,
        category,
        userId: 1,
      });
      setOpen(true);
      setMessage('');
      setCategory('SPORTS');
      setMessageError(false);
    } catch {
      setError(true);
    }
  };

  return (
    <>
      <TextField
        fullWidth
        label="Message"
        value={message}
        onChange={(e) => {
          const val = e.target.value;
          setMessage(val);

          if (val.trim().length >= 3 && val.trim().length <= 100) {
            setMessageError(false);
          } else {
            setMessageError(true);
          }
        }}
        margin="normal"
        error={messageError}
        helperText={
          messageError ? 'Message must be between 3 and 100 characters' : ''
        }
      />
      <TextField
        fullWidth
        select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        margin="normal"
      >
        {categories.map((cat) => (
          <MenuItem key={cat.id} value={cat.code}>
            {cat.name}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Send Notification
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success">Notification sent!</Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={() => setError(false)}
      >
        <Alert severity="error">Something went wrong.</Alert>
      </Snackbar>
    </>
  );
}
