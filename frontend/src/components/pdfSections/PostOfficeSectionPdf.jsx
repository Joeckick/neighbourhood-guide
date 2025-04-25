import React from 'react';
import { Text, View, StyleSheet, Link } from '@react-pdf/renderer';

// Define styles
const styles = StyleSheet.create({
  section: { marginBottom: 15, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#cccccc', borderBottomStyle: 'dashed' },
  subheading: { fontSize: 14, marginBottom: 8, fontWeight: 'bold', color: '#444444' },
  paragraph: { fontSize: 11, marginBottom: 3, lineHeight: 1.4, color: '#555555' },
  bold: { fontWeight: 'bold' },
  addressText: { fontSize: 10, marginLeft: 5, marginBottom: 4, color: '#666666' },
  smallText: { fontSize: 9, color: '#777777', marginTop: 8 },
  link: { color: '#0000EE', textDecoration: 'none' },
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

function PostOfficeSectionPdf({ post_office }) {
  if (!post_office) {
    return null;
  }

  const address = formatAddressPdf(post_office.tags);
  const searchLink = `https://www.google.com/search?q=${encodeURIComponent((post_office.name || 'Post Office') + ' opening hours services')}`;

  return (
    <View style={styles.section}>
      <Text style={styles.subheading}>Post Office</Text>
      <Text style={styles.paragraph}>
        Nearest Branch: <Text style={styles.bold}>{post_office.name || 'Name not available'}</Text>
      </Text>
      <Text style={styles.addressText}>{address}</Text>
      <Link src={searchLink} style={[styles.link, styles.addressText]}>
        Search online for opening hours & services
      </Link>
      <Text style={styles.smallText}>
        Opening hours and specific services offered can vary. Please check online.
      </Text>
    </View>
  );
}

export default PostOfficeSectionPdf; 