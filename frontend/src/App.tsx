// filepath: /frontend/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import HomePage from './pages/HomePage';
import ListingPage from './pages/ListingPage';
import RedirectPage from 'pages/RedirectPage';
import NotFoundPage from 'pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <Router>
      <AppBar position="static" sx={{ backgroundColor: '#1a202c' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/list">
              Listing Page
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListingPage />} />
        <Route path="/:shortUrlPath" element={<RedirectPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
