import axios, { AxiosResponse } from 'axios'
import fs from 'fs'
import path from 'path';
import FormData from 'form-data';

describe('Image Upload API', () => {
  let response: AxiosResponse
  const destinationFolderPath = 'uploads/';
  beforeAll(async()=>{
    const files = fs.readdirSync(destinationFolderPath);
    files.forEach((file) => {
      const filePath = path.join(destinationFolderPath, file);
      fs.unlinkSync(filePath);
    });
const imageUrl = 'image.svg'
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imageUrl));
    response = await axios.post('http://localhost:3000/upload', formData, {
      headers: formData.getHeaders(),
    });

  })

  it('image get saved in the dest folder', ()=>{

    // Get the number of files in the destination folder after the upload
    const files = fs.readdirSync(destinationFolderPath);
    const fileCount = files.length;

    // Make sure there is at least one file in the destination folder
    expect(fileCount).toBeGreaterThan(0);
  })
  it('create socket when upload',async () => {

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
  
});
