import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  Grid
} from '@mui/material';

// Define available interests
const ALL_INTERESTS = [
  'Hiking/Outdoors',
  'Local History',
  'Food & Drink',
  'Family Activities',
  'Shopping',
  'Arts & Culture',
  'Nightlife',
  'Sports & Fitness'
];

function PersonalizationForm({ onChange }) {
  const [name, setName] = useState('');
  const [selectedInterests, setSelectedInterests] = useState({}); // Use an object for checkbox state

  // Initialize checkbox state
  useEffect(() => {
    const initialInterests = ALL_INTERESTS.reduce((acc, interest) => {
      acc[interest] = false;
      return acc;
    }, {});
    setSelectedInterests(initialInterests);
  }, []);

  // Handle name change
  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    // Notify parent of the change
    onChange({ name: newName, interests: getSelectedInterestKeys() });
  };

  // Handle interest checkbox change
  const handleInterestChange = (event) => {
    const { name, checked } = event.target;
    const updatedInterests = {
      ...selectedInterests,
      [name]: checked,
    };
    setSelectedInterests(updatedInterests);
    // Notify parent of the change
    onChange({ name, interests: getSelectedInterestKeys(updatedInterests) });
  };

  // Helper to get array of selected interest keys
  const getSelectedInterestKeys = (interestsState = selectedInterests) => {
    return Object.entries(interestsState)
      .filter(([key, value]) => value)
      .map(([key]) => key);
  };

  return (
    <Box sx={{ mt: 3, mb: 2, p: 2, border: '1px dashed grey', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>Personalize Guide (Optional)</Typography>
      <TextField
        margin="normal"
        fullWidth
        id="recipientName"
        label="Recipient's Name"
        name="recipientName"
        value={name}
        onChange={handleNameChange}
        size="small"
      />

      <FormControl component="fieldset" variant="standard" sx={{ mt: 2, width: '100%' }}>
        <FormLabel component="legend">Select Interests:</FormLabel>
        <FormGroup sx={{ mt: 1 }}>
           <Grid container spacing={1}>
             {ALL_INTERESTS.map((interest) => (
              <Grid item xs={6} sm={4} md={3} key={interest}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={selectedInterests[interest] || false} 
                      onChange={handleInterestChange} 
                      name={interest} 
                      size="small"
                    />
                  }
                  label={interest}
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
      </FormControl>
    </Box>
  );
}

export default PersonalizationForm; 