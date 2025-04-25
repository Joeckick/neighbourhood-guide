import { useState, useCallback } from 'react';

function useGuideApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGuideData = useCallback(async (postcode, name = '', interests = []) => {
    if (!postcode) return; // Don't fetch if postcode is empty

    console.log(`useGuideApi: Fetching data for ${postcode}, Name: ${name}, Interests: ${interests.join(', ')}`);
    setLoading(true);
    setError(null);
    setData(null);

    try {
        // Build base URL
        let apiUrl = `/api/guide/${encodeURIComponent(postcode)}`;
        
        // Create query parameters
        const queryParams = new URLSearchParams();
        if (name) {
            queryParams.append('name', name);
        }
        if (interests && interests.length > 0) {
            // Join interests array into a comma-separated string for the query param
            queryParams.append('interests', interests.join(','));
        }

        // Append query parameters if any exist
        const queryString = queryParams.toString();
        if (queryString) {
            apiUrl += `?${queryString}`;
        }
        
        console.log(`useGuideApi: Requesting ${apiUrl}`);

        const response = await fetch(apiUrl);

        console.log(`useGuideApi: Response status ${response.status}`);
        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json(); // Try to parse error response body
            } catch (e) {
                errorData = { message: `HTTP error! Status: ${response.status}` }; // Fallback error
            }
            console.error("useGuideApi: API Error Data:", errorData);
            throw new Error(errorData.error || errorData.message || `HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("useGuideApi: Data received", result);
        setData(result);

    } catch (err) {
        console.error('useGuideApi: Fetch error:', err);
        setError(err.message || 'Failed to fetch guide data.');
    } finally {
        setLoading(false);
    }
  }, []); // useCallback ensures fetchGuideData function identity is stable

  return { data, loading, error, fetchGuideData };
}

export default useGuideApi; 