import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Link
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'; // For GP/Dentist
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
  // Correctly concatenate the search term before encoding
  const searchTerm = (name || '') + (type ? (', ' + type) : '') + ' near me';
  return `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
};

function HealthcareSection({ healthcare }) {
  // Don't render if no healthcare data at all
  if (!healthcare || (!healthcare.gp && !healthcare.pharmacy && !healthcare.hospital && !healthcare.dentist)) {
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
          Search online for details (phone, hours, NHS status)
        </Link>
      </Grid>
    );
  }

  return (
    <Box component={Paper} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Healthcare</Typography>
      <Grid container spacing={2}>
        {renderService(healthcare.gp, 'GP Surgery / Clinic', <MedicalServicesIcon sx={{ mr: 1 }} />)}
        {renderService(healthcare.pharmacy, 'Pharmacy', <LocalPharmacyIcon sx={{ mr: 1 }} />)}
        {renderService(healthcare.hospital, 'Hospital', <LocalHospitalIcon sx={{ mr: 1 }} />)}
        {renderService(healthcare.dentist, 'Dentist', <MedicalServicesIcon sx={{ mr: 1 }} />)}
      </Grid>
      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
        <InfoOutlinedIcon fontSize="small" color="action" sx={{ mr: 1 }} />
        <Typography variant="caption" color="text.secondary">
            Please verify details like opening hours, contact numbers, and NHS availability directly with the provider or via official NHS resources.
        </Typography>
      </Box>
    </Box>
  );
}

export default HealthcareSection;
