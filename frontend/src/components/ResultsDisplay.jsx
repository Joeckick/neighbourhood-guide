import React from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Divider,
  Button
} from '@mui/material';
import { PDFDownloadLink } from '@react-pdf/renderer'; 
// Remove direct imports of MapDisplay and PlacesList
// import MapDisplay from './MapDisplay'; 
// import PlacesList from './PlacesList';
import GuidePdfDocument from './GuidePdfDocument'; // Keep minimal PDF doc for now

// Import section components
import IntroductionSection from './sections/IntroductionSection';
import LocationSection from './sections/LocationSection';
import SummarySection from './sections/SummarySection';
import PlacesSection from './sections/PlacesSection';
import TransportSection from './sections/TransportSection'; // Import TransportSection
// Import other section placeholders later (e.g., EssentialsSection)

function ResultsDisplay({ loading, error, data }) {

  // --- Loading State --- 
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // --- Error State --- 
  if (error) {
    return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;
  }

  // --- Initial/No Data State --- 
  if (!data) {
    return <Typography sx={{ mt: 4, fontStyle: 'italic' }}>Enter postcode & details above.</Typography>; 
  }

  // --- Data Display State --- 
  const pdfFileName = `Neighbourhood_Guide_${data.postcode || 'Report'}.pdf`;

  return (
    <Box sx={{ mt: 4 }}> 
      {/* Introduction Section (Handles its own title/welcome) */}
      <IntroductionSection recipientName={data.recipientName} postcode={data.postcode} />
      
      {/* Download Button (Moved below intro) */}
       <Box sx={{ mb: 3, mt: -1 }}> {/* Adjust spacing */} 
        <PDFDownloadLink 
          document={<GuidePdfDocument data={data} />} 
          fileName={pdfFileName}
          style={{ textDecoration: 'none' }} 
        >
          {({ loading: pdfLoading, error: pdfError }) => 
             pdfLoading ? (
              <Button variant="outlined" disabled>Generating PDF...</Button>
            ) : pdfError ? (
              <Button variant="outlined" disabled color="error">PDF Error</Button>
            ) : (
              <Button variant="contained" size="small">Download PDF Guide</Button>
            )
          }
        </PDFDownloadLink>
      </Box>

      {/* Render Sections */} 
      <Divider sx={{ mb: 3 }}/>
      <LocationSection coordinates={data.coordinates} />
      <Divider sx={{ mb: 3 }}/>
      <TransportSection transport={data.transport} />
      <Divider sx={{ mb: 3 }}/>
      <SummarySection summary={data.summary} />
      <Divider sx={{ mb: 3 }}/>
      <PlacesSection places={data.places} />
      {/* Add other sections here later (Essentials, etc.) */}
      
    </Box>
  );
}

export default ResultsDisplay; 