import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { globalStyles } from '../../styles/pdfStyles'; // Adjust path

// Styles removed, using globalStyles

function LocationSectionPdf({ coordinates }) {
  return (
     // Use global section style
     <View style={globalStyles.section}>
        {/* Use global subheading style */}
        <Text style={globalStyles.h3}>Location</Text>
        {/* Use global paragraph style */}
        <Text style={globalStyles.paragraph}>
          Approximate Coordinates: {coordinates?.latitude?.toFixed(5) ?? 'N/A'}, {coordinates?.longitude?.toFixed(5) ?? 'N/A'}
        </Text>
        {/* Use global paragraph and italic styles */}
        <Text style={[globalStyles.paragraph, globalStyles.italic]}>[Map Image Placeholder]</Text>
      </View>
  );
}

export default LocationSectionPdf; 