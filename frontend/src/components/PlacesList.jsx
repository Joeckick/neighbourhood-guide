import React from 'react';
import { Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';

// Re-define categories here or import from a shared constants file later
const CATEGORIES_TO_DISPLAY = {
  supermarkets: { key: 'shop', value: 'supermarket' },
  convenience: { key: 'shop', value: 'convenience' }, 
  pharmacies: { key: 'amenity', value: 'pharmacy' },
  post_offices: { key: 'amenity', value: 'post_office' },
  banks: { key: 'amenity', value: 'bank' },
  parks: { key: 'leisure', value: 'park' },
  playgrounds: { key: 'leisure', value: 'playground' },
  cafes: { key: 'amenity', value: 'cafe' },
  restaurants: { key: 'amenity', value: 'restaurant' },
  pubs: { key: 'amenity', value: 'pub' },
  // Add more categories as needed
};

// Simple helper to capitalize first letter
const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); 
};

function PlacesList({ places }) {
  // Now expects places to be a flat array
  if (!places || places.length === 0) {
    return <Typography sx={{ mt: 2 }}>No specific places data found nearby.</Typography>;
  }

  // Categorize the flat array
  const categorizedPlaces = {};
  for (const categoryName in CATEGORIES_TO_DISPLAY) {
    categorizedPlaces[categoryName] = []; // Initialize empty array for each category
  }
  // Add an 'other' category for places that don't match
  // categorizedPlaces['other'] = [];

  places.forEach(place => {
    let foundCategory = false;
    for (const categoryName in CATEGORIES_TO_DISPLAY) {
      const categoryDef = CATEGORIES_TO_DISPLAY[categoryName];
      if (place.tags && place.tags[categoryDef.key] === categoryDef.value) {
        categorizedPlaces[categoryName].push(place);
        foundCategory = true;
        break; // Place added to a category
      }
    }
    // Optional: Add to 'other' category if not matched
    // if (!foundCategory && place.tags?.name) { // Only add if it has a name
    //   categorizedPlaces['other'].push(place);
    // }
  });

  // Filter out categories with no items
  const categoriesToRender = Object.keys(categorizedPlaces).filter(
    key => categorizedPlaces[key].length > 0
  );

  if (categoriesToRender.length === 0) {
     return <Typography sx={{ mt: 2 }}>No categorized places found nearby.</Typography>;
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>Nearby Places:</Typography>
      {
        categoriesToRender.map((category, index) => {
          const categoryPlaces = categorizedPlaces[category]; // Get the array for this category
          
          return (
            <Box key={category} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {capitalize(category)} ({categoryPlaces.length})
              </Typography>
              <List dense={true}>
                {categoryPlaces.map((place, placeIndex) => {
                  // Now place is guaranteed to be an object with tags
                  const placeText = place.tags?.name || `Unnamed ${capitalize(category)}`;
                  
                  return (
                    <ListItem key={`${category}-${place.id || placeIndex}`} disablePadding sx={{ pl: 2 }}> 
                      <ListItemText primary={placeText} />
                    </ListItem>
                  );
                })}
              </List>
              {index < categoriesToRender.length - 1 && <Divider sx={{ my: 1 }}/>} {/* Divider between categories */}
            </Box>
          );
        })
      }
    </Box>
  );
}

export default PlacesList; 