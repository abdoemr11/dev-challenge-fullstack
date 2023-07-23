class ImageStore {
    private static images: { [key: string]: { progress: number } } = {};
  
    static appendNewImage(): string {
      const imageId = `image_${Date.now()}`;
      ImageStore.images[imageId] = { progress: 0 };
      return imageId;
    }
  
    static getProgress(imageId: string): number {
      const image = ImageStore.images[imageId];
      return image ? image.progress : -1;
    }
  
    static updateProgress(imageId: string, progress: number): void {
      const image = ImageStore.images[imageId];
      if (image) {
        image.progress = progress;
      }
    }
  }
  
  export default ImageStore;
  