import axios, { AxiosResponse } from "axios";
import fs from "fs";
import path from "path";
import FormData from "form-data";
import { getProgressArray, uploadImage } from "./image.utils";

describe("Image Upload API", () => {
    let response: AxiosResponse;
    const destinationFolderPath = "uploads/";

    beforeAll(async () => {
        const files = fs.readdirSync(destinationFolderPath);
        files.forEach((file) => {
            const filePath = path.join(destinationFolderPath, file);
            fs.unlinkSync(filePath);
        });
    }, 10000);

    it("image get saved in the dest folder", async () => {
        // Get the number of files in the destination folder after the upload
        await uploadImage();

        const files = fs.readdirSync(destinationFolderPath);
        const fileCount = files.length;
        // Make sure there is at least one file in the destination folder
        expect(fileCount).toBeGreaterThan(0);
    });
    it("should return image url", async () => {
        const response = await uploadImage();
        expect(response.data.imageId).toBeTruthy();
    });
    it("should get the uploaded image given its url", async () => {
        const response = await uploadImage();
        const imageResponse = await axios.get(
            `http://localhost:3000/uploads/${response.data.imageId}`
        );
        console.log(imageResponse.headers["Content-Type"]);
        expect(imageResponse.status).toBe(200);
        expect(imageResponse.headers["Content-Type"]).toBe("video/mp4");
    });
});
