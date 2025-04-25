import React from 'react';
import { Text, View, StyleSheet, Link } from '@react-pdf/renderer';

// Define styles
const styles = StyleSheet.create({
  section: { marginBottom: 15, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#cccccc', borderBottomStyle: 'dashed' },
  subheading: { fontSize: 14, marginBottom: 8, fontWeight: 'bold', color: '#444444' },
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

function EmergencyServicesSectionPdf({ emergency_services }) {
  if (!emergency_services || (!emergency_services.police && !emergency_services.fire_station)) {
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
      <Text style={styles.subheading}>Emergency Services</Text>
      <View style={styles.gridContainer}>
        {renderServicePdf(emergency_services.police, 'Police Station')}
        {renderServicePdf(emergency_services.fire_station, 'Fire Station')}
      </View>
       <Text style={styles.serviceDetail}>Non-emergency Police: {emergency_services.non_emergency_phone || '101'}</Text>
      <Text style={styles.smallText}>
        In case of emergency, always dial 999.
      </Text>
    </View>
  );
}

export default EmergencyServicesSectionPdf; 