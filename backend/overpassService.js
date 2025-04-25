const axios = require('axios');

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

// Define MVP categories and their Overpass tags
const MVP_CATEGORIES = {
  supermarkets: '[shop=supermarket]',
  convenience: '[shop=convenience]',
  pharmacies: '[amenity=pharmacy]',
  post_offices: '[amenity=post_office]',
  parks: '[leisure=park]',
  playgrounds: '[leisure=playground]',
  cafes: '[amenity=cafe]',
  restaurants: '[amenity=restaurant]',
  pubs: '[amenity=pub]',
  banks: '[amenity=bank]',
  doctors: '[amenity=doctors]',
  clinics: '[amenity=clinic]',
  hospitals: '[amenity=hospital]',
  dentists: '[amenity=dentist]',
  police: '[amenity=police]',
  fire_stations: '[amenity=fire_station]',
};

/**
 * Builds an Overpass QL query string for the MVP categories.
 * @param {number} lat Latitude.
 * @param {number} lon Longitude.
 * @param {number} radius Radius in meters.
 * @returns {string} The Overpass QL query string.
 */
function buildOverpassQuery(lat, lon, radius) {
  let queryParts = [];
  for (const key in MVP_CATEGORIES) {
    const tags = MVP_CATEGORIES[key];
    const safeTags = tags.startsWith('[') && tags.endsWith(']') ? tags : `[${tags}]`; 
    queryParts.push(`node(around:${radius},${lat},${lon})${safeTags};`);
    queryParts.push(`way(around:${radius},${lat},${lon})${safeTags};`);
    queryParts.push(`relation(around:${radius},${lat},${lon})${safeTags};`);
  }

  return `
    [out:json][timeout:25];
    (
      ${queryParts.join('\n      ')}
    );
    out center;
  `;
}

/**
 * Queries the Overpass API for specific amenities around a given point.
 * @param {number} lat Latitude of the center point.
 * @param {number} lon Longitude of the center point.
 * @param {number} radius Radius in meters.
 * @returns {Promise<object>} A promise that resolves to the parsed Overpass JSON response.
 */
async function queryOverpass(lat, lon, radius) {
  console.log(`Querying Overpass for lat=${lat}, lon=${lon}, radius=${radius}`);
  const query = buildOverpassQuery(lat, lon, radius);
  // console.log("Overpass Query:", query); // Uncomment for debugging

  try {
    // Overpass API expects the query in the body of a POST request
    const response = await axios.post(OVERPASS_URL, query, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    console.log('Overpass query successful.');
    return response.data; // Contains the JSON response with elements
  } catch (error) {
    console.error('Error querying Overpass API:', error.response ? error.response.data : error.message);
    // Rethrow or handle specific errors (e.g., timeout, too many requests)
    throw new Error('Failed to fetch data from Overpass API');
  }
}

/**
 * Parses the raw Overpass API JSON response into a flat array of place objects.
 * @param {object} overpassData The raw JSON data from the Overpass API.
 * @returns {Array<object>} An array containing place objects with id, type, lat, lon, and tags.
 */
function parseOverpassResponse(overpassData) {
  const allPlaces = []; // Initialize an empty array for all places

  if (!overpassData || !overpassData.elements) {
    console.warn('No elements found in Overpass response.');
    return allPlaces; // Return empty array
  }

  overpassData.elements.forEach(element => {
    const tags = element.tags;
    // We still need tags, but maybe not necessarily a name for all types of places?
    // Let's include elements even without a name for now, frontend can filter later.
    if (!tags) return; 

    let lat, lon;
    if (element.type === 'node') {
      lat = element.lat;
      lon = element.lon;
    } else if (element.center) { // For ways and relations
      lat = element.center.lat;
      lon = element.center.lon;
    }

    // Include if coordinates are valid
    if (lat !== undefined && lon !== undefined) {
      allPlaces.push({
        id: element.id,
        type: element.type,
        lat: lat,
        lon: lon,
        tags: tags || {} // Include the full tags object, ensure it's an object
      });
    }
  });

  // Optional: Sort the flat array by name if needed, handling missing names
  allPlaces.sort((a, b) => {
      const nameA = a.tags.name || '';
      const nameB = b.tags.name || '';
      return nameA.localeCompare(nameB);
  });

  console.log(`Overpass response parsed successfully into ${allPlaces.length} places.`);
  return allPlaces; // Return the flat array
}

module.exports = {
  queryOverpass,
  parseOverpassResponse,
}; 