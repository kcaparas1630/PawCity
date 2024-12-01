import axios from 'axios';

const API_BASE_URL = 'https://pawcity.onrender.com';

export const uploadPhotos = async (photos: File[]) => {
  const formData = new FormData();
  photos.forEach(photo => {
    formData.append('photos', photo);
  });

  const response = await axios.post(`${API_BASE_URL}/upload/photos`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  // Return the photos array directly from the response
  return response.data.photos; // Now returns array of filenames
}; 
