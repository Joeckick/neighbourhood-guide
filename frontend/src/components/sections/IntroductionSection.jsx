import React from 'react';
import { Box, Typography } from '@mui/material';

function IntroductionSection({ recipientName, postcode }) {
  // Basic personalized intro
  const welcomeMessage = recipientName 
    ? `Welcome to ${postcode || 'the area'}, ${recipientName}!`
    : `Welcome to ${postcode || 'the area'}!`;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" gutterBottom>Guide for {postcode}</Typography>
      <Typography variant="body1">{welcomeMessage}</Typography>
      <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 1 }}>
        This personalized guide aims to help you get acquainted with your new neighbourhood.
      </Typography>
      {/* TODO: Add more intro text later based on interests */}
    </Box>
  );
}

export default IntroductionSection; 