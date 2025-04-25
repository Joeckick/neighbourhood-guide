import React from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { colors, fontSizes } from '../../styles/pdfStyles'; // Assuming styles are in src/styles

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 2, // Takes up more space
  },
  headerRight: {
    flex: 1, // Takes up less space
    alignItems: 'flex-end', // Align content to the right
  },
  logo: {
    fontSize: fontSizes.h4, // Adjusted size
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: colors.secondary,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  title: {
    fontSize: fontSizes.h1,
    marginBottom: 5,
    color: colors.primary,
    fontWeight: 'bold',
  },
  postcode: {
    fontSize: fontSizes.h2, // Adjusted size
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 8,
  },
  coordinates: {
    fontSize: fontSizes.small, // Adjusted size
    color: colors.lightText,
    marginBottom: 10,
  },
  introText: {
    fontSize: fontSizes.body, // Use base body size
    color: colors.text,
    maxWidth: '80%', // Prevent text from hitting map
  },
  mapPlaceholder: {
    borderWidth: 1,
    borderColor: colors.border,
    height: 100, // Adjusted size
    width: 150, // Adjusted size
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.accent,
    // Add marginTop if needed to align better with text
  },
  mapText: {
    color: colors.lightText,
    fontStyle: 'italic',
    fontSize: fontSizes.small,
  },
});

// TODO: Replace placeholder text with actual data passed via props
function HeaderPdf({ postcode = 'SW1A 0AA', coordinates = '51.4998, -0.1246', recipientName }) {
  // Use recipientName for a personalized welcome if available
  const welcomeTitle = recipientName ? `Welcome, ${recipientName}` : 'Welcome';
  const areaName = postcode.split(' ')[0]; // Basic extraction, might need refinement

  return (
    <View style={styles.headerContainer} fixed> {/* Use fixed if header should repeat */} 
      <View style={styles.headerLeft}>
        <Text style={styles.logo}>Neighborhood Guide</Text>
        {/* Adjust title based on data/logic */} 
        <Text style={styles.title}>{welcomeTitle} to {areaName}</Text>
        <Text style={styles.postcode}>{postcode}</Text>
        <Text style={styles.coordinates}>
          Lat: {coordinates?.latitude?.toFixed(5) ?? 'N/A'}, Lon: {coordinates?.longitude?.toFixed(5) ?? 'N/A'}
        </Text>
        <Text style={styles.introText}>
          This personalized guide aims to help you get acquainted with your new neighbourhood.
        </Text>
      </View>
      <View style={styles.headerRight}>
        {/* Placeholder for Map - Consider adding a real map image later */} 
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>Map View (Optional)</Text>
        </View>
      </View>
    </View>
  );
}

export default HeaderPdf; 