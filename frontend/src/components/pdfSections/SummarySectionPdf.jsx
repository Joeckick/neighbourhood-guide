import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles needed for this section
const styles = StyleSheet.create({
  section: { 
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    borderBottomStyle: 'dashed',
  },
  subheading: { 
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
});

function SummarySectionPdf({ summary }) {
  return (
      <View style={styles.section}>
        <Text style={styles.subheading}>Area Summary</Text>
        <Text style={styles.paragraph}>
          {summary || 'No summary available.'}
        </Text>
      </View>
  );
}

export default SummarySectionPdf;
