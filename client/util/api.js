import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your server's URL

export const saveLocationDataToServer = async (locationData) => {
  try {
    await axios.post(`${API_URL}/locations`, locationData);
  } catch (error) {
    console.error('Error saving location data to server:', error);
  }
};

export const getLocationDataFromServer = async () => {
  try {
    const response = await axios.get(`${API_URL}/locations`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving location data from server:', error);
    return [];
  }
};