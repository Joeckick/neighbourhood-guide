require('dotenv').config(); // Load .env variables at the very top
const express = require('express');
const axios = require('axios');
const { queryOverpass, parseOverpassResponse } = require('./overpassService');
const { generateNeighbourhoodSummary } = require('./llmService');
const { getNearbyTransport } = require('./transportService'); // Import transport service
const { getNearbyTubeStations } = require('./tflService'); // Import only getNearbyTubeStations from tflService
const { getLsoaDemographics } = require('./onsService'); // Import ONS service

const app = express();
const port = process.env.PORT || 3001; // Use environment variable or default

app.get('/', (req, res) => {
  res.send('Neighbourhood Guide Backend');
});

// --- Configuration ---
const SEARCH_RADIUS_METERS = 1000; // 1km radius

// Updated Geocode function to return full details
async function getPostcodeDetails(postcode) {
  const url = `https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === 200 && response.data.result) {
      console.log(`Postcodes.io: Details found for ${postcode}`);
      return response.data.result; // Return the full result object
    } else {
      throw new Error('Invalid postcode (API returned non-result)');
    }
  } catch (error) {
    console.error(`Error getting details for postcode ${postcode}:`, error.message);
    const isInvalidPostcode = (error.message === 'Invalid postcode (API returned non-result)') ||
                              (error.response && error.response.status === 404);
    const statusCode = isInvalidPostcode ? 404 : 500;
    const errorMessage = isInvalidPostcode ? 'Invalid postcode' : 'Failed to fetch postcode details';
    const err = new Error(errorMessage);
    err.statusCode = statusCode;
    throw err;
  }
}

// Simple check if the postcode is likely in London based on common district names
// Note: This is a basic check and might need refinement.
function isLikelyLondon(postcodeDetails) {
    if (!postcodeDetails) return false;
    const londonKeywords = ['London', 'Westminster', 'Camden', 'Islington', 'Kensington', 'Chelsea', 'Lambeth', 'Southwark', 'Tower Hamlets', 'Hackney', 'Haringey', 'Newham', 'Wandsworth', 'Greenwich', 'Lewisham', 'Hammersmith', 'Fulham', 'Ealing', 'Brent', 'Barnet', 'Harrow', 'Hillingdon', 'Hounslow', 'Richmond upon Thames', 'Kingston upon Thames', 'Merton', 'Sutton', 'Croydon', 'Bromley', 'Bexley', 'Havering', 'Barking', 'Dagenham', 'Redbridge', 'Waltham Forest', 'Enfield'];
    const region = postcodeDetails.region || '';
    const district = postcodeDetails.admin_district || '';
    const ward = postcodeDetails.admin_ward || '';

    return region.includes('London') || 
           londonKeywords.some(keyword => district.includes(keyword)) || 
           londonKeywords.some(keyword => ward.includes(keyword));
}

// --- Main Guide API Endpoint ---
app.get('/api/guide/:postcode', async (req, res) => {
  const postcode = req.params.postcode;
  const recipientName = req.query.name || ''; 
  const interestsString = req.query.interests || '';
  const interests = interestsString ? interestsString.split(',') : []; 
  
  console.log(`Generating guide for postcode: ${postcode}, Name: ${recipientName}, Interests: [${interests.join(', ')}]`);

  try {
    // 1. Get Postcode Details
    const postcodeDetails = await getPostcodeDetails(postcode);
    const latitude = postcodeDetails.latitude;
    const longitude = postcodeDetails.longitude;
    const lsoaCode = postcodeDetails.codes?.lsoa; // Get LSOA code
    const councilName = postcodeDetails.admin_district; // Get Council Name
    console.log(`Coordinates found: ${latitude}, ${longitude}. LSOA: ${lsoaCode}. Council: ${councilName}`);

    // Determine if London postcode
    const fetchTfl = isLikelyLondon(postcodeDetails);
    console.log(`Should fetch TfL data (no key check): ${fetchTfl}`);

    // 2. Fetch Data in Parallel (Add ONS)
    console.log('Fetching API data in parallel...');
    
    const apiPromises = [
        queryOverpass(latitude, longitude, SEARCH_RADIUS_METERS),
        getNearbyTransport(latitude, longitude),
        generateNeighbourhoodSummary(latitude, longitude, postcode, recipientName, interests),
        getLsoaDemographics(lsoaCode) // Add ONS call
    ];

    if (fetchTfl) {
        apiPromises.push(getNearbyTubeStations(latitude, longitude));
    } else {
        apiPromises.push(Promise.resolve([])); // Placeholder for tube stations
    }

    // Adjust destructuring to include demographicsData
    const [overpassRawData, transportData, summary, demographicsData, tubeStations] = await Promise.all(apiPromises);

    // Process results
    const places = parseOverpassResponse(overpassRawData);
    console.log('Overpass data processed.');
    console.log('Transport data fetched.');
    if (fetchTfl) console.log('TfL Tube data fetched.');
    console.log('LLM summary generated.');
    console.log('Council info prepared.');

    // --- Helper Function to Find Nearest Place by Tag ---
    // Note: "Nearest" is approximate here, based on Overpass results within radius.
    // A more accurate way would involve calculating distances if needed.
    const findNearestPlace = (tagKey, tagValue) => {
        return places.find(p => p.tags && p.tags[tagKey] === tagValue) || null;
    };
    
    // --- Extract Healthcare Info ---
    const nearestGP = findNearestPlace('amenity', 'doctors') || findNearestPlace('amenity', 'clinic');
    const nearestPharmacy = findNearestPlace('amenity', 'pharmacy');
    const nearestHospital = findNearestPlace('amenity', 'hospital');
    const nearestDentist = findNearestPlace('amenity', 'dentist');
    const healthcareInfo = {
        gp: nearestGP ? { name: nearestGP.tags.name, tags: nearestGP.tags } : null,
        pharmacy: nearestPharmacy ? { name: nearestPharmacy.tags.name, tags: nearestPharmacy.tags } : null,
        hospital: nearestHospital ? { name: nearestHospital.tags.name, tags: nearestHospital.tags } : null,
        dentist: nearestDentist ? { name: nearestDentist.tags.name, tags: nearestDentist.tags } : null,
    };
    console.log('Healthcare info extracted.');

    // --- Extract Emergency Services Info ---
    const nearestPolice = findNearestPlace('amenity', 'police');
    const nearestFireStation = findNearestPlace('amenity', 'fire_station');
    const emergencyServicesInfo = {
        police: nearestPolice ? { name: nearestPolice.tags.name, tags: nearestPolice.tags } : null,
        fire_station: nearestFireStation ? { name: nearestFireStation.tags.name, tags: nearestFireStation.tags } : null,
        non_emergency_phone: '101', // Standard UK non-emergency number
    };
    console.log('Emergency services info extracted.');

    // --- Extract Post Office Info ---
    const nearestPostOffice = findNearestPlace('amenity', 'post_office');
    const postOfficeInfo = nearestPostOffice 
        ? { name: nearestPostOffice.tags.name, tags: nearestPostOffice.tags } 
        : null;
    console.log('Post office info extracted.');

    // --- Prepare Council Info ---
    let councilInfo = null;
    if (councilName) {
      const councilWebsiteSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(councilName + ' council website')}`;
      councilInfo = {
        name: councilName,
        website_search_url: councilWebsiteSearchUrl,
      };
      console.log('Council info prepared.');
    }

    // Add tube stations to transport data if fetched
    if (fetchTfl && tubeStations && tubeStations.length > 0) {
        transportData.tube_stations = tubeStations; 
    }

    // 3. Combine and Send Response
    res.json({
      postcode: postcode,
      recipientName: recipientName, 
      interests: interests,
      coordinates: { latitude, longitude },
      admin_details: {
          district: postcodeDetails.admin_district,
          ward: postcodeDetails.admin_ward,
          region: postcodeDetails.region,
          lsoa_code: lsoaCode
      },
      council: councilInfo,
      summary: summary,
      places: places,
      transport: transportData, 
      demographics: demographicsData,
      healthcare: healthcareInfo,
      emergency_services: emergencyServicesInfo,
      post_office: postOfficeInfo,
    });

  } catch (error) {
    console.error(`Error generating guide for postcode ${postcode}:`, error.message);
    const statusCode = error.statusCode || 500; 
    res.status(statusCode).json({ error: error.message || 'Failed to generate neighbourhood guide' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}); 