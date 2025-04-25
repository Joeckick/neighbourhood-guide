import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { globalStyles } from '../../styles/pdfStyles'; // Adjust path to shared styles

// Styles are now imported from globalStyles
// const styles = StyleSheet.create({ ... }); // Removed

function IntroductionSectionPdf({ postcode, recipientName }) {

  const welcomeMessage = recipientName
    ? `Welcome to ${postcode || 'the area'}, ${recipientName}!`
    : `Welcome to ${postcode || 'the area'}!`;

  return (
    // Use global section style
    <View style={globalStyles.section}>
      {/* Use global heading style */}
      <Text style={globalStyles.h2}>Neighbourhood Guide: {postcode}</Text>
      {/* Use global paragraph style */}
      <Text style={globalStyles.paragraph}>{welcomeMessage}</Text>
      {/* Use global paragraph and italic styles */}
      <Text style={[globalStyles.paragraph, globalStyles.italic]}>
        This personalized guide aims to help you get acquainted with your new neighbourhood.
      </Text>
    </View>
  );
}

export default IntroductionSectionPdf; 