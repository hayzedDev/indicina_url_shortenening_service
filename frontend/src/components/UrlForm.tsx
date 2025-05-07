// filepath: /frontend/src/components/UrlForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';

interface UrlFormProps {
  onAddUrl: (newUrl: string) => void;
}

const UrlForm: React.FC<UrlFormProps> = ({ onAddUrl }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      try {
        setLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/encode`,
          { longUrl: url }
        );
        const shortUrl = response.data.shortUrl;
        onAddUrl(shortUrl);
        setUrl('');
      } catch (error) {
        console.error('Error shortening URL:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        mt: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Shorten Your URL
      </Typography>
      <TextField
        label="Enter URL"
        variant="outlined"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ width: '200px' }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Shorten'}
      </Button>
    </Box>
  );
};

export default UrlForm;
