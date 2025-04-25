const axios = require('axios');

// Base URL for the Police UK API
const POLICE_API_BASE_URL = 'https://data.police.uk/api';

/**
 * Fetches street-level crime data for a given latitude and longitude.
 * Optionally takes a date in YYYY-MM format (defaults to latest available).
 * @param {number} latitude 
 * @param {number} longitude 
 * @param {string|null} date - Optional date in YYYY-MM format.
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of crime objects.
 */
async function getStreetLevelCrimes(latitude, longitude, date = null) {
  const params = {
    lat: latitude,
    lng: longitude,
  };
  if (date) {
    params.date = date;
  }

  try {
    const url = `${POLICE_API_BASE_URL}/crimes-street/all-crime`;
    console.log(`PoliceService: Requesting crime data from ${url} with params:`, params);
    const response = await axios.get(url, { params });
    
    if (response.status === 200) {
        console.log(`PoliceService: Received ${response.data.length} crime reports.`);
        return response.data; 
    } else {
        console.error(`PoliceService: API returned status ${response.status}`);
        throw new Error(`Police API request failed with status ${response.status}`);
    }

  } catch (error) {
    if (error.response) {
        // Request made and server responded with a status code
        // that falls out of the range of 2xx
        console.error('PoliceService: Error fetching crime data:', error.response.status, error.response.data);
        // Handle 503 Service Unavailable gracefully (common if API is busy or no data for timeframe)
        if (error.response.status === 503) {
            console.warn("PoliceService: Police API returned 503 Service Unavailable. Returning empty array.");
            return []; // Return empty array instead of throwing hard error
        }
         throw new Error(`Police API error: ${error.response.status}`);
    } else if (error.request) {
        // The request was made but no response was received
        console.error('PoliceService: No response received from Police API:', error.request);
        throw new Error('Police API did not respond');
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('PoliceService: Error setting up Police API request:', error.message);
        throw new Error('Failed to set up Police API request');
    }
  }
}

/**
 * Summarizes an array of crime reports by category.
 * @param {Array<object>} crimes - Array of crime objects from Police API.
 * @returns {object} - An object where keys are crime categories and values are counts.
 */
function summarizeCrimesByCategory(crimes) {
    if (!Array.isArray(crimes) || crimes.length === 0) {
        return {};
    }

    const summary = crimes.reduce((acc, crime) => {
        const category = crime.category;
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {});

    console.log("PoliceService: Crime summary by category:", summary);
    return summary;
}

module.exports = {
  getStreetLevelCrimes,
  summarizeCrimesByCategory,
}; 