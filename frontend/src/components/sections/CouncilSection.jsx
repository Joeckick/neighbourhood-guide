import React from 'react';
import {
  Box,
  Typography,
  Link,
  Paper
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function CouncilSection({ council }) {
  // Don't render if no council data was found/provided
  if (!council || !council.name) {
    return null;
  }

  return (
    <Box component={Paper} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Local Council</Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Local Authority: <strong>{council.name}</strong>
      </Typography>
      {council.website_search_url && (
        <Typography variant="body1" sx={{ mb: 2 }}>
          Official Website: 
          <Link 
            href={council.website_search_url} 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{ ml: 1, display: 'inline-flex', alignItems: 'center' }}
          >
            Search for {council.name} website <OpenInNewIcon sx={{ fontSize: 'inherit', ml: 0.5 }} />
          </Link>
        </Typography>
      )}
      <Typography variant="body2" color="text.secondary">
        Specific details such as Council Tax bands, bin collection schedules, local services, and contact information can usually be found on the council's official website.
      </Typography>
    </Box>
  );
}

export default CouncilSection; 