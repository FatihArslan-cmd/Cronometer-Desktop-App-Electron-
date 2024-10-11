import axios from 'axios';

const BASE_URL = 'https://api.limewire.com/v1';
const API_KEY = process.env.REACT_APP_LIMEWIRE_API_KEY;

export const fetchLimeWireData = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from LimeWire API:', error);
    throw error;
  }
};
