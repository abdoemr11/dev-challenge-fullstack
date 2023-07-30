import axios, { AxiosResponse } from 'axios';
import fs from 'fs';
import FormData from 'form-data';
const imageUrl = 'image.mp4'

export const uploadImage = async() => {
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imageUrl));

    return axios.post('http://localhost:3000/upload', formData, {
      headers: formData.getHeaders(),
    });
}

export const getProgressArray =async (response:AxiosResponse) => {
    const progressArray : number[] = []     

    let imageId = response.data.imageId

    const fetchProgress = async () => {
      try {
        const result: AxiosResponse = await axios.get(`http://localhost:3000/upload/${imageId}`);
        progressArray.push(result.data.progress);
        console.log(Date.now())
      } catch (error) {
        if(error instanceof Error)
          console.error('Error fetching progress:', error.message);
      }
    };
    for (let i = 0; i < 20; i++) {
      await fetchProgress()

      await simulateLatency(1)
    }
    
    // await Promise.all(fetchPromises);
    return progressArray
}
function simulateLatency(delay: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}