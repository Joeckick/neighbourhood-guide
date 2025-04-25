import React from 'react';
import { Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';

// Simple helper to capitalize first letter
const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  // Updated capitalize to handle underscores and capitalize words
  return s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); 
};

function PlacesList({ places }) {
  if (!places || Object.keys(places).length === 0) {
    return <Typography sx={{ mt: 2 }}>No specific places data found nearby.</Typography>;
  }

  // Get the categories (keys) from the places object
  const categories = Object.keys(places);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>Nearby Places:</Typography>
      {
        categories.map((category, index) => {
          const categoryPlaces = places[category];
          // Don't render section if a category has no places listed
          if (!categoryPlaces || categoryPlaces.length === 0) {
            return null;
          }

          return (
            <Box key={category} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {capitalize(category)} ({categoryPlaces.length})
              </Typography>
              <List dense={true}>
                {categoryPlaces.map((place, placeIndex) => {
                  // --- DEBUGGING LOGS --- 
                  console.log(`PlacesList - Category: ${category}, Index: ${placeIndex}, Place Data:`, place);
                  // --- END DEBUGGING --- 
                  
                  const placeText = typeof place === 'object' && place !== null && place.name ? place.name : place;
                  const renderText = typeof placeText === 'string' || typeof placeText === 'number' ? placeText : 'Invalid place data';
                  
                  // --- DEBUGGING LOGS --- 
                  console.log(`PlacesList - Rendering text:`, renderText);
                  // --- END DEBUGGING --- 
                  
                  return (
                    <ListItem key={`${category}-${placeIndex}`} disablePadding sx={{ pl: 2 }}> 
                      <ListItemText primary={renderText} />
                    </ListItem>
                  );
                })}
              </List>
              {index < categories.length - 1 && <Divider sx={{ my: 1 }}/>} {/* Divider between categories */}
            </Box>
          );
        })
      }
    </Box>
  );
}

export default PlacesList; 