const axios = require('axios');
// require('dotenv').config(); // No longer strictly needed if keys aren't read here

// const TFL_APP_ID = process.env.TFL_APP_ID; // Removed
// const TFL_APP_KEY = process.env.TFL_APP_KEY; // Removed
const TFL_API_BASE_URL = 'https://api.tfl.gov.uk';

/**
 * Fetches nearby Tube stations from the TfL API (Attempting without keys).
 * @param {number} latitude 
 * @param {number} longitude 
 * @param {number} radius - Search radius in meters (TfL uses meters).
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of nearby Tube station objects.
 */
async function getNearbyTubeStations(latitude, longitude, radius = 1000) {
    // Removed credential check

    // Params without app_id and app_key
    const params = {
        lat: latitude,
        lon: longitude,
        radius: radius,
        stopTypes: 'NaptanMetroStation', // Type for Tube stations
    };

    try {
        const url = `${TFL_API_BASE_URL}/StopPoint`;
        console.log(`TflService: Requesting nearby Tube stations (NO KEYS) from ${url} with lat=${latitude}, lon=${longitude}, radius=${radius}`);
        
        // Make request without app_id/app_key in params
        const response = await axios.get(url, { params });

        if (response.status === 200 && response.data && response.data.stopPoints) {
            console.log(`TflService: Received ${response.data.stopPoints.length} Tube stations.`);
            
            // Extract relevant information and sort by distance
            const stations = response.data.stopPoints.map(sp => ({
                id: sp.id, // Naptan ID (e.g., 940GZZLU...) 
                name: sp.commonName, // User-friendly name
                distance: Math.round(sp.distance), // Distance is provided, round it
                lines: sp.lines ? sp.lines.map(l => l.name) : [], // List of lines serving the station
            })).sort((a, b) => a.distance - b.distance);

            return stations;
        } else {
            console.error(`TflService: API returned status ${response.status} or unexpected data structure.`);
            // Don't throw, return empty array
            return []; 
        }

    } catch (error) {
        if (error.response) {
            console.error('TflService: Error fetching Tube data (NO KEYS):', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('TflService: No response received from TfL API (NO KEYS):', error.request);
        } else {
            console.error('TflService: Error setting up TfL API request (NO KEYS):', error.message);
        }
        console.warn('TflService: An error occurred fetching Tube station data (NO KEYS). Returning empty results.');
        return []; 
    }
}

module.exports = {
  getNearbyTubeStations,
}; 