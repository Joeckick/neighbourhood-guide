import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

// Define categories for PDF display (Can be shared/imported later)
// This should ideally mirror the categories used elsewhere (e.g., PlacesList.jsx)
const PDF_CATEGORIES = {
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
  // Add more as needed
};

// Styles for this specific section
const styles = StyleSheet.create({
  section: { marginBottom: 15, paddingBottom: 10 }, // No border here, applied by wrapper or lastSection style
  subheading: { fontSize: 14, marginBottom: 8, fontWeight: 'bold', color: '#444444' },
  categoryTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 4, marginTop: 8, color: '#444444' },
  listItem: { fontSize: 10, marginLeft: 10, marginBottom: 3, color: '#555555' },
  paragraph: { fontSize: 11, marginBottom: 5, lineHeight: 1.4, color: '#555555' },
});

// Capitalize helper (could be moved to utils)
const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

function PlacesSectionPdf({ places }) { // Expects flat places array
  if (!places || places.length === 0) {
     return (
        <View style={styles.section}>
            <Text style={styles.subheading}>Nearby Places</Text>
            <Text style={styles.paragraph}>No places data found nearby.</Text>
        </View>
     );
  }

  // --- Categorization Logic --- 
  const categorizedPlacesPdf = {};
  for (const categoryName in PDF_CATEGORIES) {
    categorizedPlacesPdf[categoryName] = [];
  }
  places.forEach(place => {
    for (const categoryName in PDF_CATEGORIES) {
      const categoryDef = PDF_CATEGORIES[categoryName];
      if (place.tags && place.tags[categoryDef.key] === categoryDef.value) {
        categorizedPlacesPdf[categoryName].push(place);
        break; 
      }
    }
  });
  const categoriesToRenderPdf = Object.keys(categorizedPlacesPdf).filter(
    key => categorizedPlacesPdf[key].length > 0
  );
  // --- End Categorization ---

  if (categoriesToRenderPdf.length === 0) {
     return (
        <View style={styles.section}>
            <Text style={styles.subheading}>Nearby Places</Text>
            <Text style={styles.paragraph}>No categorized places found nearby.</Text>
        </View>
     );
  }

  return (
    <View style={styles.section}>
        <Text style={styles.subheading}>Nearby Places</Text>
        {categoriesToRenderPdf.map((category) => {
            const categoryPlaces = categorizedPlacesPdf[category]; 
            return (
                <View key={`pdf-${category}`} style={{ marginBottom: 5, paddingLeft: 5 }} > 
                <Text style={styles.categoryTitle}>{capitalize(category)} ({categoryPlaces.length})</Text> 
                {categoryPlaces.map((place, index) => {
                    const placeText = place.tags?.name || `Unnamed ${capitalize(category)}`;
                    return (
                    <Text key={`pdf-${category}-${place.id || index}`} style={styles.listItem}>- {placeText}</Text> 
                    );
                })}
                </View>
            );
        })}
    </View>
  );
}

export default PlacesSectionPdf; 