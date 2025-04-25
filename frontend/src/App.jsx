import React, { useState } from 'react';
import { CssBaseline, Container, Typography, Box } from '@mui/material';
import PostcodeForm from './components/PostcodeForm';
import PersonalizationForm from './components/PersonalizationForm';
import useGuideApi from './hooks/useGuideApi';
import ResultsDisplay from './components/ResultsDisplay';

function App() {
  const { data: guideData, loading, error, fetchGuideData } = useGuideApi();
  
  const [recipientName, setRecipientName] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);

  const handlePersonalizationChange = (personalizationData) => {
    setRecipientName(personalizationData.name);
    setSelectedInterests(personalizationData.interests);
  };

  const handlePostcodeSubmit = (submittedPostcode) => {
    console.log('Submitting with:', {
      postcode: submittedPostcode,
      name: recipientName,
      interests: selectedInterests
    });
    fetchGuideData(submittedPostcode, recipientName, selectedInterests);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Neighbourhood Guide
          </Typography>
          <PostcodeForm onSubmit={handlePostcodeSubmit} loading={loading} />
          
          <PersonalizationForm onChange={handlePersonalizationChange} />
          
          <ResultsDisplay loading={loading} error={error} data={guideData} />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;
