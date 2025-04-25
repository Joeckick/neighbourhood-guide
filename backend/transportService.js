const axios = require('axios');
require('dotenv').config(); // Ensure .env variables are loaded

const TRANSPORTAPI_APP_ID = process.env.TRANSPORTAPI_APP_ID;
const TRANSPORTAPI_APP_KEY = process.env.TRANSPORTAPI_APP_KEY;
const TRANSPORTAPI_BASE_URL = 'https://transportapi.com/v3';

/**
 * Fetches nearby public transport stops (bus stops, train stations) 
 * from TransportAPI for a given latitude and longitude.
 * 
 * @param {number} latitude 
 * @param {number} longitude 
 * @returns {Promise<object>} - A promise that resolves to an object containing arrays of nearby bus stops and train stations.
 */
async function getNearbyTransport(latitude, longitude) {
  if (!TRANSPORTAPI_APP_ID || !TRANSPORTAPI_APP_KEY) {
    console.warn('TransportService: TRANSPORTAPI_APP_ID or TRANSPORTAPI_APP_KEY not found in environment variables. Skipping transport search.');
    // Return empty structure instead of throwing error if keys are missing
    return { train_stations: [], bus_stops: [] }; 
  }

  const params = {
    app_id: TRANSPORTAPI_APP_ID,
    app_key: TRANSPORTAPI_APP_KEY,
    lat: latitude,
    lon: longitude,
    type: 'bus_stop,train_station', // Request both types
    limit: 10 // Limit the number of results
  };

  try {
    const url = `${TRANSPORTAPI_BASE_URL}/uk/places.json`;
    console.log(`TransportService: Requesting nearby transport from ${url} with lat=${latitude}, lon=${longitude}`);
    
    const response = await axios.get(url, { params });

    if (response.status === 200 && response.data && response.data.member) {
        const members = response.data.member;
        console.log(`TransportService: Received ${members.length} transport place members.`);
        
        // Separate into bus stops and train stations, extracting relevant info
        const train_stations = members
            .filter(m => m.type === 'train_station')
            .map(m => ({ 
                name: m.name,
                description: m.description,
                distance: m.distance, 
                accuracy: m.accuracy,
                // Add more fields if needed, e.g., m.station_code
            }))
            .sort((a, b) => a.distance - b.distance); // Sort by distance
            
        const bus_stops = members
            .filter(m => m.type === 'bus_stop')
            .map(m => ({ 
                name: m.name, 
                description: m.description, 
                distance: m.distance,
                accuracy: m.accuracy,
                // Add more fields if needed, e.g., m.atcocode
            }))
            .sort((a, b) => a.distance - b.distance); // Sort by distance

        console.log(`TransportService: Found ${train_stations.length} train stations, ${bus_stops.length} bus stops.`);
        return { train_stations, bus_stops };

    } else {
      console.error(`TransportService: API returned status ${response.status} or unexpected data structure.`);
      throw new Error(`TransportAPI request failed with status ${response.status || 'Unknown'}`);
    }

  } catch (error) {
    if (error.response) {
      console.error('TransportService: Error fetching transport data:', error.response.status, error.response.data?.error || error.response.data);
      // Don't throw fatal error, just return empty structure
      // throw new Error(`TransportAPI error: ${error.response.status}`); 
    } else if (error.request) {
      console.error('TransportService: No response received from TransportAPI:', error.request);
      // throw new Error('TransportAPI did not respond');
    } else {
      console.error('TransportService: Error setting up TransportAPI request:', error.message);
      // throw new Error('Failed to set up TransportAPI request');
    }
    // Return empty structure on any error during fetch
    console.warn('TransportService: An error occurred fetching transport data. Returning empty results.');
    return { train_stations: [], bus_stops: [] }; 
  }
}

module.exports = {
  getNearbyTransport,
}; 