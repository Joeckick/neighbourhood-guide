import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Link
} from '@mui/material';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Helper to construct address string from tags
const formatAddress = (tags) => {
  if (!tags) return 'Address not available';
  const parts = [
    tags['addr:housenumber'],
    tags['addr:street'],
    tags['addr:city'],
    tags['addr:postcode'],
  ];
  return parts.filter(part => part).join(', ') || 'Address details unavailable';
};

// Helper to create search link
const createSearchLink = (name) => {
  const searchTerm = name ? `${name} Post Office` : 'Post Office near me';
  return `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
};

function PostOfficeSection({ post_office }) {
  // Don't render if no data
  if (!post_office) {
    return null;
  }

  const address = formatAddress(post_office.tags);
  const searchLink = createSearchLink(post_office.name);
  
  return (
    <Box component={Paper} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <LocalPostOfficeIcon sx={{ mr: 1 }} /> Post Office
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
         Nearest Branch: <strong>{post_office.name || 'Name not available'}</strong>
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
        {address}
      </Typography>
      <Link href={searchLink} target="_blank" rel="noopener noreferrer" variant="caption">
        Search online for opening hours & services
      </Link>
      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
        <InfoOutlinedIcon fontSize="small" color="action" sx={{ mr: 1 }} />
        <Typography variant="caption" color="text.secondary">
            Opening hours and specific services offered can vary. Please check online.
        </Typography>
      </Box>
    </Box>
  );
}

export default PostOfficeSection; 