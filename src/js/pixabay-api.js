import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '49327734-00ffb8023b77f666b7f6e293e';

export async function getData(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}
