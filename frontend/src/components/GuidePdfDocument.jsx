import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Restore original styles 
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30, 
  },
  section: { // Style for each logical section block
    marginBottom: 15, // Add space between sections
    paddingBottom: 10, // Padding within section
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    borderBottomStyle: 'dashed',
  },
  lastSection: { // Remove bottom border for the last section
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  heading: { // Overall document heading
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333333',
  },
  subheading: { // Section headings
    fontSize: 14,
    marginBottom: 8, 
    fontWeight: 'bold',
    color: '#444444',
  },
  paragraph: {
    fontSize: 11,
    marginBottom: 5,
    lineHeight: 1.4,
    color: '#555555',
  },
  listItem: { 
    fontSize: 10,
    marginLeft: 10, 
    marginBottom: 3,
    color: '#555555',
  },
  categoryTitle: { 
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 4,
      marginTop: 8,
      color: '#444444',
  },
  italic: {
      fontStyle: 'italic',
      color: '#777777'
  }
});

// Restore capitalize helper
const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

// Create Document Component - Restoring sections and full content
function GuidePdfDocument({ data }) {
  if (!data) {
    return (
      <Document><Page size="A4" style={styles.page}><View><Text>No data</Text></View></Page></Document>
    );
  }
  
  const places = data.places || {};
  const categories = Object.keys(places);
  
  // Personalized Intro Text
  const welcomeMessage = data.recipientName 
    ? `Welcome to ${data.postcode || 'the area'}, ${data.recipientName}!`
    : `Welcome to ${data.postcode || 'the area'}!`;

  return (
    <Document title={`Neighbourhood Guide - ${data.postcode}`}>
      <Page size="A4" style={styles.page}>
        
        {/* Introduction Section */}
        <View style={styles.section} wrap={false}> {/* wrap={false} prevents breaking page inside this small section */} 
          <Text style={styles.heading}>Neighbourhood Guide: {data.postcode}</Text>
          <Text style={styles.paragraph}>{welcomeMessage}</Text>
          <Text style={[styles.paragraph, styles.italic]}>
            This personalized guide aims to help you get acquainted with your new neighbourhood.
          </Text>
        </View>

        {/* Location Section */}
        <View style={styles.section}>
          <Text style={styles.subheading}>Location</Text>
          <Text style={styles.paragraph}>
            Approximate Coordinates: {data.coordinates?.latitude?.toFixed(5) ?? 'N/A'}, {data.coordinates?.longitude?.toFixed(5) ?? 'N/A'}
          </Text>
          {/* Map Placeholder - Consider how to add this later */}
          <Text style={[styles.paragraph, styles.italic]}>[Map Image Placeholder]</Text> 
        </View>

        {/* Summary Section */}
        <View style={styles.section}>
          <Text style={styles.subheading}>Area Summary</Text>
          <Text style={styles.paragraph}>
            {data.summary || 'No summary available.'}
          </Text>
        </View>

        {/* Places Section */}
        <View style={[styles.section, styles.lastSection]}> {/* Apply lastSection style */} 
          <Text style={styles.subheading}>Nearby Places</Text>
          {categories.length > 0 ? (
            categories.map((category) => {
              const placeNames = places[category];
              if (!placeNames || placeNames.length === 0) {
                return null; 
              }
              return (
                <View key={category} style={{ marginBottom: 5, paddingLeft: 5 }} > 
                  <Text style={styles.categoryTitle}>{capitalize(category)} ({placeNames.length})</Text>
                  {placeNames.map((place, index) => {
                    const placeText = typeof place === 'object' && place !== null && place.name ? place.name : place;
                    const renderText = typeof placeText === 'string' || typeof placeText === 'number' ? placeText : 'Invalid place data';
                    return (
                      <Text key={`${category}-${index}`} style={styles.listItem}>- {renderText}</Text>
                    );
                  })}
                </View>
              );
            })
          ) : (
            <Text style={styles.paragraph}>No specific places data found nearby.</Text>
          )}
        </View>
        
        {/* Add other sections (Transport, Essentials etc.) here later */} 

      </Page>
    </Document>
  );
}

export default GuidePdfDocument; 