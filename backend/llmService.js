const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (recommended)
// Ensure you have a .env file in the backend directory with GOOGLE_API_KEY=YOUR_API_KEY
// and run the server using `node -r dotenv/config server.js` or similar
// OR set it directly in your environment.
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

/**
 * Generates a neighbourhood summary using the Gemini model.
 * @param {number} lat Latitude of the center point.
 * @param {number} lon Longitude of the center point.
 * @param {string} postcode The user-provided postcode.
 * @returns {Promise<string>} A promise that resolves to the generated text summary.
 */
async function generateNeighbourhoodSummary(lat, lon, postcode) {
  console.log(`Generating neighbourhood summary for postcode ${postcode} (${lat}, ${lon})`);

  // Check if API key is loaded
  if (!process.env.GOOGLE_API_KEY) {
    console.error("GOOGLE_API_KEY not found in environment variables.");
    throw new Error('API key configuration error');
  }

  // Using the user-specified (latest) flash model:
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // TODO: Refine this prompt based on testing and desired output style
  const prompt = `
    You are a helpful local guide assistant.
    Describe the general character, vibe, and key features of the immediate area around the UK postcode ${postcode} (approximate coordinates: latitude ${lat}, longitude ${lon}).
    Focus on aspects relevant to someone considering moving there.
    Mention the types of amenities available nearby (like shops, cafes, parks), the general atmosphere (e.g., quiet residential, bustling, family-friendly, good nightlife?), and any notable local landmarks or characteristics.
    Keep the summary concise, informative, and engaging, around 2-3 paragraphs.
    Assume you have access to up-to-date information.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    // Add check for response existence before calling text()
    if (!response) {
        console.error("LLM response was undefined or null.");
        throw new Error('Invalid response received from LLM');
    }
    const text = response.text();
    console.log('LLM summary generated successfully.');
    return text;
  } catch (error) {
    console.error("Error generating neighbourhood summary:", error);
    // Consider more specific error handling or fallback text
    // Check for specific API errors if available in error object
    throw new Error('Failed to generate neighbourhood summary');
  }
}

module.exports = {
  generateNeighbourhoodSummary,
}; 