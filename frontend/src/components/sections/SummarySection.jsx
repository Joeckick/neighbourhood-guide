import React from 'react';
import { Box, Typography } from '@mui/material';

function SummarySection({ summary }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>Area Summary</Typography>
      <Typography paragraph variant="body2">
        {summary || 'No summary available.'}
      </Typography>
    </Box>
  );
}

export default SummarySection; 