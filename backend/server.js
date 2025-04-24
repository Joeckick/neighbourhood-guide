require('dotenv').config(); // Load .env variables at the very top
const express = require('express');
const axios = require('axios');
const { queryOverpass, parseOverpassResponse } = require('./overpassService');
const { generateNeighbourhoodSummary } = require('./llmService');

const app = express();
const port = process.env.PORT || 3001; // Use environment variable or default

app.get('/', (req, res) => {
  res.send('Neighbourhood Guide Backend');
});

// --- Configuration ---
const SEARCH_RADIUS_METERS = 1000; // 1km radius

// --- Helper Function for Geocoding ---
async function getCoordinatesForPostcode(postcode) {
  const url = `https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === 200 && response.data.result) {
      return {
        latitude: response.data.result.latitude,
        longitude: response.data.result.longitude,
      };
    } else {
      throw new Error('Invalid postcode (API returned non-result)');
    }
  } catch (error) {
    console.error(`Error geocoding postcode ${postcode}:`, error.message);
    const isInvalidPostcode = (error.message === 'Invalid postcode (API returned non-result)') ||
                              (error.response && error.response.status === 404);
    const statusCode = isInvalidPostcode ? 404 : 500;
    const errorMessage = isInvalidPostcode ? 'Invalid postcode' : 'Failed to fetch geocode data';
    const err = new Error(errorMessage);
    err.statusCode = statusCode;
    throw err;
  }
}

// --- Main Guide API Endpoint ---
app.get('/api/guide/:postcode', async (req, res) => {
  const postcode = req.params.postcode;
  console.log(`Generating guide for postcode: ${postcode}`);

  try {
    // 1. Geocode Postcode
    const { latitude, longitude } = await getCoordinatesForPostcode(postcode);
    console.log(`Coordinates found: ${latitude}, ${longitude}`);

    // 2. Fetch and Parse Overpass Data
    console.log('Fetching Overpass data...');
    const overpassRawData = await queryOverpass(latitude, longitude, SEARCH_RADIUS_METERS);
    const places = parseOverpassResponse(overpassRawData);
    console.log('Overpass data processed.');

    // 3. Generate LLM Summary
    console.log('Generating LLM summary...');
    const summary = await generateNeighbourhoodSummary(latitude, longitude, postcode);
    console.log('LLM summary generated.');

    // 4. Combine and Send Response
    res.json({
      postcode: postcode,
      coordinates: { latitude, longitude },
      summary: summary,
      places: places, // Contains keys like supermarkets, cafes, etc.
    });

  } catch (error) {
    console.error(`Error generating guide for postcode ${postcode}:`, error.message);
    const statusCode = error.statusCode || 500; // Use specific status code if available
    res.status(statusCode).json({ error: error.message || 'Failed to generate neighbourhood guide' });
  }
});


// --- Original Geocode Endpoint (Optional) ---
app.get('/api/geocode/:postcode', async (req, res) => {
  const postcode = req.params.postcode;
  try {
    const { latitude, longitude } = await getCoordinatesForPostcode(postcode);
    res.json({ latitude, longitude });
  } catch (error) {
    console.error('Error fetching geocode data:', error.message);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ error: error.message || 'Failed to fetch geocode data' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}); 