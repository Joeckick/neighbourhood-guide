import React from 'react';
import { Text, View, Link } from '@react-pdf/renderer';
import { globalStyles } from '../../styles/pdfStyles'; // Adjust path

function CouncilSectionPdf({ council }) {
  if (!council || !council.name) {
    return null;
  }

  return (
    <View style={globalStyles.section}>
      <Text style={globalStyles.h3}>Local Council</Text>
      <Text style={globalStyles.paragraph}>
        Local Authority: <Text style={globalStyles.bold}>{council.name}</Text>
      </Text>
      {council.website_search_url && (
        <Text style={globalStyles.paragraph}>
          Official Website Search:
          <Link src={council.website_search_url} style={globalStyles.link}>
            Search for {council.name} website
          </Link>
        </Text>
      )}
      <Text style={globalStyles.smallText}>
        Specific details such as Council Tax bands, bin collection schedules, local services, and contact information can usually be found on the council's official website.
      </Text>
    </View>
  );
}

export default CouncilSectionPdf; 