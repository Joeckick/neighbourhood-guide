import React from 'react';
import { Document, Page, View, StyleSheet, Text } from '@react-pdf/renderer';
import DemographicsSectionPdf from './pdfSections/DemographicsSectionPdf';
import EssentialsSectionPdf from './pdfSections/EssentialsSectionPdf';
import IntroductionSectionPdf from './pdfSections/IntroductionSectionPdf';
import LocationSectionPdf from './pdfSections/LocationSectionPdf';
import TransportSectionPdf from './pdfSections/TransportSectionPdf';
import SummarySectionPdf from './pdfSections/SummarySectionPdf';
import CouncilSectionPdf from './pdfSections/CouncilSectionPdf';
import HealthcareSectionPdf from './pdfSections/HealthcareSectionPdf';
import EmergencyServicesSectionPdf from './pdfSections/EmergencyServicesSectionPdf';
import PostOfficeSectionPdf from './pdfSections/PostOfficeSectionPdf';
import PlacesSectionPdf from './pdfSections/PlacesSectionPdf';
import AreaSummarySectionPdf from './pdfSections/AreaSummarySectionPdf';

// Import shared styles and new components
import { globalStyles } from '../styles/pdfStyles'; // Import global styles
import HeaderPdf from './pdfSections/HeaderPdf';
import FooterPdf from './pdfSections/FooterPdf';

// Styles are now minimal, mostly for page layout
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'column',
//     backgroundColor: '#FFFFFF',
//     padding: 30,
//   },
//   // This style is used to wrap the last section to prevent the default bottom border
//   lastSectionWrapper: {
//       borderBottomWidth: 0,
//       marginBottom: 0,
//       paddingBottom: 0,
//       // Ensure section styles within components don't add unwanted borders/margins
//   }
// });

// Create Document Component
function GuidePdfDocument({ data }) {
  // Check if data exists at the beginning
  if (!data) {
    // Use the new global page style for the error message
    return (
        <Document>
            <Page size="A4" style={globalStyles.page}>
                <HeaderPdf postcode="N/A" coordinates="N/A" recipientName="" />
                <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Guide data is unavailable.</Text>
                </View>
                <FooterPdf />
            </Page>
        </Document>
    );
  }
  
  // Extract necessary data, providing defaults
  const placesArray = data.places || []; 
  const { train_stations = [], bus_stops = [], tube_stations = [] } = data.transport || {};
  
  // Slice for top 3 transport (can be done here or within TransportSectionPdf if preferred)
  const nearest_train_stations = train_stations.slice(0, 3);
  const nearest_bus_stops = bus_stops.slice(0, 3);
  const nearest_tube_stations = tube_stations.slice(0, 3);

  return (
    <Document title={`Neighbourhood Guide - ${data.postcode}`}>
      {/* Apply global page style */}
      <Page size="A4" style={globalStyles.page}>
        {/* Add Header */}
        <HeaderPdf
          postcode={data.postcode}
          coordinates={data.coordinates}
          recipientName={data.recipientName}
        />

        {/* Main content area - allows footer to be at the bottom */}
        <View style={{ flexGrow: 1 }}>
          {/* Render all sections using their dedicated components */}
          {/* Sections will need internal styling updates next */}
          <IntroductionSectionPdf postcode={data.postcode} recipientName={data.recipientName} />
          <LocationSectionPdf coordinates={data.coordinates} />
          <CouncilSectionPdf council={data.council} />
          <HealthcareSectionPdf healthcare={data.healthcare} />
          <EmergencyServicesSectionPdf emergency_services={data.emergency_services} />
          <PostOfficeSectionPdf post_office={data.post_office} />
          
          {/* Conditional Demographics Section */} 
          {data.demographics && (
              <DemographicsSectionPdf demographics={data.demographics} />
          )}
          
          {/* Conditional Transport Section (Component handles internal check) */} 
          <TransportSectionPdf 
            nearest_tube_stations={nearest_tube_stations}
            nearest_train_stations={nearest_train_stations}
            nearest_bus_stops={nearest_bus_stops}
          />
          
          <SummarySectionPdf summary={data.summary} />
          <EssentialsSectionPdf places={placesArray} />

          {/* Nearby Places Section - Remove the wrapper */}
          <PlacesSectionPdf places={placesArray} />

          {/* --- Area Summary --- */}
          {data.transport && (
            <AreaSummarySectionPdf transport={data.transport} />
          )}
        </View>

        {/* Add Footer */}
        <FooterPdf />
      </Page>
    </Document>
  );
}

export default GuidePdfDocument; 