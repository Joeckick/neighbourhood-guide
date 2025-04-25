import React from 'react';
import { Text, View } from '@react-pdf/renderer';
// Import global styles
import { globalStyles } from '../../styles/pdfStyles';

// Define essential categories for PDF
const essentialCategoriesPdf = [
  { 
    name: 'Supermarkets', 
    // No icons in PDF, just text
    tags: [
      { key: 'shop', value: 'supermarket' },
      { key: 'shop', value: 'convenience' },
    ]
  },
  { 
    name: 'Pharmacies', 
    tags: [
      { key: 'amenity', value: 'pharmacy' },
    ]
  },
  { 
    name: 'Doctors / Clinics', 
    tags: [
      { key: 'amenity', value: 'doctors' },
      { key: 'amenity', value: 'clinic' },
    ]
  },
  { 
    name: 'Dentists', 
    tags: [
      { key: 'amenity', value: 'dentist' },
    ]
  },
];

// Helper to check if a place matches a category's tags
const placeMatchesCategoryPdf = (place, category) => {
  if (!place.tags) return false;
  return category.tags.some(tag => place.tags[tag.key] === tag.value);
};

function EssentialsSectionPdf({ places }) {
  if (!places) { // Check for null/undefined places array
    return null;
  }

  // Filter places for each essential category
  const categorizedEssentials = essentialCategoriesPdf.map(category => ({
    ...category,
    items: places.filter(place => placeMatchesCategoryPdf(place, category))
           // Optionally sort items by distance if available
           // .sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity))
  })).filter(category => category.items.length > 0); // Only keep categories with items

  // If no essentials were found after filtering, render a message
  if (categorizedEssentials.length === 0) {
    return (
      <View style={globalStyles.section}>
        <Text style={globalStyles.h3}>Local Essentials</Text> {/* Use global heading style */}
        <Text style={globalStyles.paragraph}> {/* Use global paragraph style */}
          No essential amenities (supermarkets, pharmacies, doctors, dentists) found nearby.
        </Text>
      </View>
    );
  }

  // Render the section with the found essentials
  return (
    <View style={globalStyles.section}>
      <Text style={globalStyles.h3}>Local Essentials</Text> {/* Use global heading style */}

      {categorizedEssentials.map((category) => (
        <View key={`pdf-ess-${category.name}`} style={{ marginTop: 8 }}> {/* Add some space before each category */}
          {/* Use global smaller heading style for category title */}
          <Text style={globalStyles.h4}>{category.name} ({category.items.length})</Text>
          {/* Use global list container and item styles */}
          <View style={globalStyles.listContainer}>
            {category.items.map((item, index) => (
              <Text key={`pdf-ess-${category.name}-${item.id || index}`} style={globalStyles.listItemText}>
                {/* Using a simple bullet point for PDF */}
                • {item.tags?.name || `Unnamed ${category.name.slice(0, -1)}`}
                {/* Optionally add distance: {item.distance ? ` (${item.distance}m)` : ''} */}
              </Text>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

export default EssentialsSectionPdf; 