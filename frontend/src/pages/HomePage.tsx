import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';
import LinkIcon from '@mui/icons-material/Link';

const HomePage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Regular expression to validate URLs
  const isValidUrl = (value: string) => {
    const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*(\?.*)?$/i;
    return urlRegex.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    setShortUrl(''); // Clear any previous short URL
    if (url.trim() && isValidUrl(url)) {
      try {
        setLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/encode`,
          { longUrl: url }
        );
        setShortUrl(`${process.env.REACT_APP_FRONTEND_URL}/response.data.data`); // Display the returned short URL
        setUrl(''); // Clear the input field
      } catch (error: any) {
        console.error('Error shortening URL:', error);
        setError(
          error.response?.data?.message ||
            'An error occurred. Please try again.'
        ); // Display error message
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#1a202c',
        color: '#fff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 4,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          Build Stronger Digital Connections
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ opacity: 0.8 }}>
          Use our URL shortener to create short, memorable links that connect
          your audience to the right information.
        </Typography>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            marginTop: 4,
            backgroundColor: '#2d3748',
            borderRadius: 2,
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Paste your long URL here"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
                marginBottom: 2,
              }}
              error={url !== '' && !isValidUrl(url)} // Show error if the URL is invalid
              helperText={
                url !== '' && !isValidUrl(url) ? 'Please enter a valid URL' : ''
              }
            />
            {
              // <Button
              //   type="submit"
              //   variant="contained"
              //   color="primary"
              //   fullWidth
              //   disabled={!isValidUrl(url) || loading} // Disable button if URL is invalid or loading
              //   sx={{
              //     padding: 1.5,
              //     fontSize: '1rem',
              //     textTransform: 'none',
              //     display: 'flex',
              //     alignItems: 'center',
              //     justifyContent: 'center',
              //     backgroundColor: !isValidUrl(url) ? '#001933' : '#007bff', // Light red when disabled, vibrant blue when enabled
              //     color: !isValidUrl(url) ? '#ffffff' : '#ffffff', // Dark red text when disabled, white text when enabled
              //     '&:hover': {
              //       backgroundColor: !isValidUrl(url) ? '#001933' : '#0056b3', // No hover effect for disabled state
              //     },
              //     cursor: !isValidUrl(url) ? 'not-allowed' : 'pointer', // Show "not-allowed" cursor when disabled
              //   }}
              // >
              //   {loading ? (
              //     <CircularProgress size={24} color="inherit" />
              //   ) : (
              //     <>
              //       <LinkIcon sx={{ marginRight: 1 }} />
              //       Get your link for free
              //     </>
              //   )}
              // </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!isValidUrl(url) || loading} // Disable button if URL is invalid or loading
                sx={{
                  padding: 1.5,
                  fontSize: '1rem',
                  textTransform: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    url === ''
                      ? '#f0ad4e'
                      : !isValidUrl(url)
                      ? '#d9534f'
                      : '#007bff', // Orange when app loads, red when invalid, blue when valid
                  color: 'ffffff', // White text for all states
                  // color: url === '' || !isValidUrl(url) ? '#ffffff' : '#ffffff', // White text for all states
                  '&:hover': {
                    backgroundColor:
                      url === ''
                        ? '#ec971f'
                        : !isValidUrl(url)
                        ? '#c9302c'
                        : '#0056b3', // Darker orange, red, or blue on hover
                  },
                  cursor:
                    url === '' || !isValidUrl(url) ? 'not-allowed' : 'pointer', // Show "not-allowed" cursor when disabled
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <>
                    <LinkIcon sx={{ marginRight: 1 }} />
                    Get your link for free
                  </>
                )}
              </Button>
            }
          </form>
          {error && (
            <Alert
              severity="error"
              sx={{
                marginTop: 2,
                backgroundColor: '#ffcccc',
                color: '#990000',
              }}
            >
              {error}
            </Alert>
          )}
          {/* {shortUrl && (
            <Typography
              variant="body1"
              sx={{
                marginTop: 2,
                color: '#90cdf4',
                wordBreak: 'break-word',
              }}
            >
              Shortened URL: <a href={shortUrl}>{shortUrl}</a>
            </Typography>
          )} */}

          {shortUrl && (
            <Typography
              variant="body1"
              sx={{
                marginTop: 2,
                color: '#00ff00', // Bright green for better visibility
                wordBreak: 'break-word',
                fontWeight: 'bold', // Make the text bold
              }}
            >
              Shortened URL:{' '}
              <a href={shortUrl} style={{ color: '#00ff00' }}>
                {shortUrl}
              </a>
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage;
