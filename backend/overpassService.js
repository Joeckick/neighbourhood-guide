const axios = require('axios');

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

// Define MVP categories and their Overpass tags
const MVP_CATEGORIES = {
  supermarkets: '[shop=supermarket]',
  pharmacies: '[amenity=pharmacy]',
  post_offices: '[amenity=post_office]',
  parks: '[leisure=park]',
  playgrounds: '[leisure=playground]',
  cafes: '[amenity=cafe]',
  restaurants: '[amenity=restaurant]',
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
    queryParts.push(`node(around:${radius},${lat},${lon})${tags};`);
    queryParts.push(`way(around:${radius},${lat},${lon})${tags};`);
    queryParts.push(`relation(around:${radius},${lat},${lon})${tags};`);
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
 * Parses the raw Overpass API JSON response into a structured object by category.
 * @param {object} overpassData The raw JSON data from the Overpass API.
 * @returns {object} An object with keys for each category containing an array of places.
 */
function parseOverpassResponse(overpassData) {
  const results = {};
  // Initialize results object with empty arrays for each category
  for (const key in MVP_CATEGORIES) {
    results[key] = [];
  }

  if (!overpassData || !overpassData.elements) {
    console.warn('No elements found in Overpass response.');
    return results; // Return empty structure
  }

  overpassData.elements.forEach(element => {
    const tags = element.tags;
    if (!tags) return; // Skip elements without tags

    const name = tags.name;
    if (!name) return; // Skip elements without a name tag

    let lat, lon;
    if (element.type === 'node') {
      lat = element.lat;
      lon = element.lon;
    } else if (element.center) { // For ways and relations with 'out center;'
      lat = element.center.lat;
      lon = element.center.lon;
    }

    if (lat === undefined || lon === undefined) return; // Skip if no coordinates found

    // Determine the category based on tags
    for (const key in MVP_CATEGORIES) {
      const categoryTags = MVP_CATEGORIES[key]; // e.g., '[shop=supermarket]'
      // Simple check: does the tag key (e.g., 'shop') exist in the element's tags?
      // And does the tag value (e.g., 'supermarket') match?
      // This needs refinement for combined tags or different tag keys (like leisure, amenity)
      const match = categoryTags.match(/\[(\w+)=(\w+)\]/);
      if (match && tags[match[1]] === match[2]) {
        results[key].push({ name, lat, lon });
        break; // Found category, no need to check others for this element
      }
    }
  });

  // Sort results alphabetically by name within each category
  for (const key in results) {
    results[key].sort((a, b) => a.name.localeCompare(b.name));
  }

  console.log('Overpass response parsed successfully.');
  return results;
}

module.exports = {
  queryOverpass,
  parseOverpassResponse,
}; 