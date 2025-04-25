import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'; // Example Icon

const DemographicsSection = ({ demographics }) => {
  if (!demographics || !demographics.population_density || !demographics.age_structure) {
    // Don't render the section if data is missing
    // Optionally, log a message or show a placeholder
    console.log("Demographics data not available for rendering.");
    return null;
  }

  const { population_density, age_structure } = demographics;

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <PeopleOutlineIcon color="primary" sx={{ mr: 1.5 }} />
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 0, fontWeight: 'medium' }}>
          Local Area Demographics (LSOA)
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>Population Density:</strong> {population_density.toLocaleString()} people per square km (approx.)
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium' }}>Age Structure:</Typography>
          <Box sx={{ pl: 1 }}> {/* Indent age structure for clarity */}
            <Typography variant="body2"> - 0-17 years: {age_structure['0-17']}%</Typography>
            <Typography variant="body2"> - 18-64 years: {age_structure['18-64']}%</Typography>
            <Typography variant="body2"> - 65+ years: {age_structure['65+']}%</Typography>
          </Box>
        </Grid>
      </Grid>
       <Typography variant="caption" display="block" mt={2} color="text.secondary">
         Data based on the 2021 Census for the local Lower Layer Super Output Area (LSOA).
       </Typography>
    </Paper>
  );
};

export default DemographicsSection; 