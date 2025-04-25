import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { globalStyles } from '../../styles/pdfStyles';

const AreaSummarySectionPdf = ({ areaSummary }) => {
  // Only render the section if there is summary text
  if (!areaSummary) {
    return null;
  }

  return (
    <View style={globalStyles.section}>
      <Text style={globalStyles.h3}>Area Summary</Text>
      <Text style={globalStyles.paragraph}>
        {areaSummary}
      </Text>
    </View>
  );
};

export default AreaSummarySectionPdf; 