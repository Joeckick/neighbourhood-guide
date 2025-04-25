import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { globalStyles } from '../../styles/pdfStyles'; // Adjust path

// Styles removed, using globalStyles

const DemographicsSectionPdf = ({ demographics }) => {
  if (!demographics || !demographics.population_density || !demographics.age_structure) {
    return null;
  }

  const { population_density, age_structure } = demographics;

  return (
    // Use global section style
    <View style={globalStyles.section}>
      {/* Use global heading style */}
      <Text style={globalStyles.h3}>Local Area Demographics (LSOA)</Text>

      {/* Population Density - Using label/value container */}
      <View style={globalStyles.labelValueContainer}>
        <Text style={globalStyles.label}>Population Density:</Text>
        <Text style={globalStyles.value}>{population_density.toLocaleString()} people per square km (approx.)</Text>
      </View>

      {/* Age Structure - Using label and list styles */}
      <View style={{ marginTop: 5 }}> {/* Container for label + list */}
        <Text style={globalStyles.label}>Age Structure:</Text>
        <View style={globalStyles.listContainer}> {/* Indented list */}
          <Text style={globalStyles.listItemText}>0-17 years: {age_structure['0-17']}%</Text>
          <Text style={globalStyles.listItemText}>18-64 years: {age_structure['18-64']}%</Text>
          <Text style={globalStyles.listItemText}>65+ years: {age_structure['65+']}%</Text>
        </View>
      </View>

      {/* Use global caption style */}
      <Text style={globalStyles.caption}>
         Data based on the 2021 Census for the local Lower Layer Super Output Area (LSOA).
       </Text>
    </View>
  );
};

export default DemographicsSectionPdf; 