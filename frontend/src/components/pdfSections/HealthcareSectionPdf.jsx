import React from 'react';
import { Text, View, StyleSheet, Link } from '@react-pdf/renderer';

// Define styles
const styles = StyleSheet.create({
  section: { marginBottom: 15, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#cccccc', borderBottomStyle: 'dashed' },
  subheading: { fontSize: 14, marginBottom: 8, fontWeight: 'bold', color: '#444444' },
  paragraph: { fontSize: 11, marginBottom: 3, lineHeight: 1.4, color: '#555555' },
  serviceTitle: { fontSize: 11, fontWeight: 'bold', color: '#555555', marginBottom: 2 },
  serviceDetail: { fontSize: 10, marginLeft: 5, marginBottom: 4, color: '#666666' },
  smallText: { fontSize: 9, color: '#777777', marginTop: 8 },
  link: { color: '#0000EE', textDecoration: 'none' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', width: '100%' },
  gridItem: { width: '50%', paddingRight: 10, marginBottom: 8 }, // Two columns
});

// Helper to format address for PDF
const formatAddressPdf = (tags) => {
  if (!tags) return 'Address not available';
  const parts = [
    tags['addr:housenumber'],
    tags['addr:street'],
    tags['addr:city'],
    tags['addr:postcode'],
  ];
  return parts.filter(part => part).join(', ') || 'Address details unavailable';
};

function HealthcareSectionPdf({ healthcare }) {
  if (!healthcare || (!healthcare.gp && !healthcare.pharmacy && !healthcare.hospital && !healthcare.dentist)) {
    return null;
  }

  const renderServicePdf = (serviceData, title) => {
    if (!serviceData) {
      return (
        <View style={styles.gridItem}>
          <Text style={styles.serviceTitle}>{title}</Text>
          <Text style={styles.serviceDetail}>Not found nearby.</Text>
        </View>
      );
    }
    const address = formatAddressPdf(serviceData.tags);
    const searchLink = `https://www.google.com/search?q=${encodeURIComponent((serviceData.name || title) + ' details')}`;
    
    return (
      <View style={styles.gridItem}>
        <Text style={styles.serviceTitle}>
          {title}: {serviceData.name || 'Name not available'}
        </Text>
        <Text style={styles.serviceDetail}>{address}</Text>
        <Link src={searchLink} style={[styles.link, styles.serviceDetail]}>Search online for details</Link>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={styles.subheading}>Healthcare</Text>
      <View style={styles.gridContainer}>
          {renderServicePdf(healthcare.gp, 'GP Surgery / Clinic')}
          {renderServicePdf(healthcare.pharmacy, 'Pharmacy')}
          {renderServicePdf(healthcare.hospital, 'Hospital')}
          {renderServicePdf(healthcare.dentist, 'Dentist')}
      </View>
      <Text style={styles.smallText}>
        Please verify details like opening hours, contact numbers, and NHS availability directly with the provider or via official NHS resources.
      </Text>
    </View>
  );
}

export default HealthcareSectionPdf; 