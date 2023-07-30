import axios, { AxiosResponse } from 'axios'
import fs from 'fs'
import path from 'path';
import FormData from 'form-data';
import { getProgressArray, uploadImage } from './image.utils';

describe('Image Upload API', () => {
  let response: AxiosResponse
  const destinationFolderPath = 'uploads/';

  beforeAll(async()=>{

    const files = fs.readdirSync(destinationFolderPath);
    files.forEach((file) => {
      const filePath = path.join(destinationFolderPath, file);
      fs.unlinkSync(filePath);
  });


    response = await uploadImage()

  }, 10000)

  it('image get saved in the dest folder', ()=>{

    // Get the number of files in the destination folder after the upload
    const files = fs.readdirSync(destinationFolderPath);
    const fileCount = files.length;

    // Make sure there is at least one file in the destination folder
    expect(fileCount).toBeGreaterThan(0);
  })
  it('should add image to the image pools',async () => {

    expect(response.status).toBe(200)
    expect(response.data.message).toEqual('Image uploaded successfully!' );
    expect(response.data.imageId).toBeTruthy();

  })
  it('know the current progress ',async () => {
    let imageId = response.data.imageId
    console.log(imageId)
    const result: AxiosResponse  = await axios.get(`http://localhost:3000/upload/${imageId}`)
    expect(result.data.progress).toBeGreaterThanOrEqual(0)
    expect(result.data.progress).toBeLessThanOrEqual(100)
  })
  
  it('should update the progress priodically', async()=> {


    response = await uploadImage()
    const progressArray = await getProgressArray(response)  

    console.log(progressArray)
    for (let i = 0; i < progressArray.length - 1; i++) {
      const currentProgress = progressArray[i];
      const nextProgress = progressArray[i + 1];
      expect(nextProgress).toBeGreaterThan(currentProgress);

      if(currentProgress === 100)
        break
    }  }, 10000)
});
