import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Link
} from '@mui/material';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
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
const createSearchLink = (name, type) => {
  const searchTerm = (name || type) + ' near me';
  return `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
};

function EmergencyServicesSection({ emergency_services }) {
  // Don't render if no data at all
  if (!emergency_services || (!emergency_services.police && !emergency_services.fire_station)) {
    return null;
  }

  const renderService = (serviceData, title, icon) => {
    if (!serviceData) {
      return (
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>{icon}{title}</Typography>
          <Typography variant="body2" color="text.secondary">Not found nearby.</Typography>
        </Grid>
      );
    }
    const address = formatAddress(serviceData.tags);
    const searchLink = createSearchLink(serviceData.name, title);
    
    return (
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            {icon}
            <span style={{ marginLeft: '8px' }}>{title}: <strong>{serviceData.name || 'Name not available'}</strong></span>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          {address}
        </Typography>
        <Link href={searchLink} target="_blank" rel="noopener noreferrer" variant="caption">
          Search online for details & contact info
        </Link>
      </Grid>
    );
  }

  return (
    <Box component={Paper} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Emergency Services</Typography>
      <Grid container spacing={2}>
        {renderService(emergency_services.police, 'Police Station', <LocalPoliceIcon sx={{ mr: 1 }} />)}
        {renderService(emergency_services.fire_station, 'Fire Station', <LocalFireDepartmentIcon sx={{ mr: 1 }} />)}
      </Grid>
      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
        <InfoOutlinedIcon fontSize="small" color="action" sx={{ mr: 1 }} />
        <Typography variant="caption" color="text.secondary">
          In case of emergency, always dial 999. For non-emergencies, call 101 for police.
        </Typography>
      </Box>
    </Box>
  );
}

export default EmergencyServicesSection; 