import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Chip,
  Paper 
} from '@mui/material';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore'; // Example icon
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy'; // Example icon
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; // Example icon (can represent doctors/clinics)
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'; // Example for dentists or other services

// Define categories and their corresponding OSM tags/values
const essentialCategories = [
  { 
    name: 'Supermarkets', 
    icon: <LocalGroceryStoreIcon />,
    tags: [
      { key: 'shop', value: 'supermarket' },
      { key: 'shop', value: 'convenience' }, // Include convenience stores? Decide based on preference.
    ]
  },
  { 
    name: 'Pharmacies', 
    icon: <LocalPharmacyIcon />,
    tags: [
      { key: 'amenity', value: 'pharmacy' },
    ]
  },
  { 
    name: 'Doctors / Clinics', 
    icon: <LocalHospitalIcon />, // Using hospital icon as a general representation
    tags: [
      { key: 'amenity', value: 'doctors' },
      { key: 'amenity', value: 'clinic' },
    ]
  },
  { 
    name: 'Dentists', 
    icon: <MedicalServicesIcon />, // Using this for dentist
    tags: [
      { key: 'amenity', value: 'dentist' },
    ]
  },
  // Add more categories if needed (e.g., Post Office, Banks)
];

function EssentialsSection({ places }) {
  // Log received places data
  // console.log("EssentialsSection received places:", places); // REMOVED
  
  if (!places || places.length === 0) {
    // Don't render the section if there's no places data
    return null; 
  }

  // Function to check if a place matches any tag in a category
  const placeMatchesCategory = (place, category) => {
    if (!place.tags) return false;
    return category.tags.some(tag => place.tags[tag.key] === tag.value);
  };

  // Filter places for each category
  const categorizedEssentials = essentialCategories.map(category => ({
    ...category,
    items: places.filter(place => placeMatchesCategory(place, category))
  })).filter(category => category.items.length > 0); // Only keep categories with items

  // Log the result of filtering
  // console.log("EssentialsSection categorized essentials:", categorizedEssentials); // REMOVED

  if (categorizedEssentials.length === 0) {
     return (
       <Box component={Paper} sx={{ p: 3, mb: 3 }}>
         <Typography variant="h5" gutterBottom>Local Essentials</Typography>
         <Typography variant="body1">No essential amenities like supermarkets, pharmacies, doctors, or dentists were found within the search radius.</Typography>
       </Box>
     );
  }

  return (
    <Box component={Paper} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Local Essentials</Typography>
      
      {categorizedEssentials.map((category) => (
        <Box key={category.name} sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            {category.icon}
            <span style={{ marginLeft: '8px' }}>{category.name} ({category.items.length})</span>
          </Typography>
          <List dense>
            {category.items.map((item) => (
              <ListItem key={item.id} disableGutters>
                <ListItemText 
                  primary={item.tags?.name || 'Unnamed ' + category.name.slice(0, -1)} 
                  // Optionally add distance or address if available later
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
}

export default EssentialsSection;