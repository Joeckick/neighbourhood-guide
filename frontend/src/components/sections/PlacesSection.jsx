import React from 'react';
import { Box, Typography } from '@mui/material';
import PlacesList from '../PlacesList'; // Adjust import path

function PlacesSection({ places }) {
  return (
    <Box sx={{ mb: 3 }}>
      {/* Title is now inside PlacesList, but could add a wrapper title here if needed */}
      <PlacesList places={places ?? {}} />
    </Box>
  );
}

export default PlacesSection; 