import axios from 'axios';

// ⭐ CRITICAL FIX: Base URL set to Vercel Production URL
const API_BASE_URL = 'https://home-nest-server-fp6l8gc6y-arif-hossains-projects-a41d4c7a.vercel.app';

/**
 * Fetches featured properties from the Vercel backend.
 * This is the function passed as a prop to FeaturedProperties.
 * @returns {Promise<Array>} A promise that resolves to an array of property data.
 */
export async function getFeaturedProperties() {
    try {
        // ⭐ THE URL MUST USE API_BASE_URL HERE!
        const response = await axios.get(`${API_BASE_URL}/featured-properties`);
        return response.data;
    } catch (error) {
        console.error("Error fetching featured properties from Vercel:", error);
        // It's good practice to throw the error or return an empty array on failure
        return []; 
    }
}