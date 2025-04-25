import React from 'react';
import { Box, Typography } from '@mui/material';
import MapDisplay from '../MapDisplay'; // Adjust import path

function LocationSection({ coordinates }) {
  const lat = coordinates?.latitude ?? null;
  const lon = coordinates?.longitude ?? null;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>Location</Typography>
      <Typography variant="body2" paragraph>
        Approximate Coordinates: {lat !== null ? lat.toFixed(5) : 'N/A'}, {lon !== null ? lon.toFixed(5) : 'N/A'}
      </Typography>
      <MapDisplay latitude={lat} longitude={lon} />
    </Box>
  );
}

export default LocationSection; 