import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { colors, fontSizes } from '../../styles/pdfStyles'; // Adjust path if needed

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute', // Fixed positioning for footer
    bottom: 20, // Position from bottom of page
    left: 40,   // Corresponds to page padding left
    right: 40,  // Corresponds to page padding right
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', // Take full width relative to page padding
    fontSize: fontSizes.small,
    color: colors.lightText,
  },
  logo: {
    fontWeight: 'bold',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footerText: {
    textAlign: 'right',
  },
});

function FooterPdf() {
  return (
    <View style={styles.footerContainer} fixed>
      <Text style={styles.logo}>Neighborhood Guide</Text>
      <View style={styles.footerText}>
        <Text>Your friendly guide to the area.</Text>
        {/* Optional: Add dynamic content like date or page number later */}
        {/* <Text
          render={({ pageNumber, totalPages }) => (
            `Page ${pageNumber} of ${totalPages}`
          )}
        /> */}
      </View>
    </View>
  );
}

export default FooterPdf; 