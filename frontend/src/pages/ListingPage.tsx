import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
} from '@mui/material';

interface UrlData {
  shortUrl: string;
  longUrl: string;
  createdAt: Date;
  visits: number;
  lastAccessed: Date | null;
  referrers: { domain: string; count: number }[];
  geoDistribution: { country: string; count: number }[];
}

const ListingPage: React.FC = () => {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [filteredUrls, setFilteredUrls] = useState<UrlData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/list`
        );
        setUrls(response.data.data);
        setFilteredUrls(response.data.data); // Initialize filtered URLs
      } catch (error) {
        console.error('Error fetching URL list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  // Fuse.js options for fuzzy search
  const fuse = new Fuse(urls, {
    keys: ['longUrl'], // Search only in the longUrl field
    threshold: 0.3, // Adjust the threshold for fuzzy matching (lower = stricter)
  });

  // Handle search input changes
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length >= 3) {
      const results = fuse.search(value);
      setFilteredUrls(results.map((result) => result.item)); // Extract matched items
    } else {
      setFilteredUrls(urls); // Reset to full list if search term is less than 3 characters
    }
  };

  if (loading) {
    return (
      <Typography variant="h6" align="center">
        Loading...
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        URL List
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by long URL (at least 3 characters)"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ marginBottom: 2 }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Short URL</strong>
              </TableCell>
              <TableCell>
                <strong>Long URL</strong>
              </TableCell>
              <TableCell>
                <strong>Created At</strong>
              </TableCell>
              <TableCell>
                <strong>Visits</strong>
              </TableCell>
              <TableCell>
                <strong>Last Accessed</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUrls.map((url) => (
              <TableRow key={url.shortUrl}>
                <TableCell>{url.shortUrl}</TableCell>
                <TableCell>{url.longUrl}</TableCell>
                <TableCell>
                  {new Date(url.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>{url.visits}</TableCell>
                <TableCell>
                  {url.lastAccessed
                    ? new Date(url.lastAccessed).toLocaleString()
                    : 'Never'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListingPage;
