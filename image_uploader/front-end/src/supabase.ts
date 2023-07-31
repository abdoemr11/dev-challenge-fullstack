export const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const { data, error } = await supabase.storage
        .from("your_bucket_name")
        .upload("unique_filename", file, {
            cacheControl: "3600", // optional caching setting
        });

    if (error) {
        console.error("Error uploading file:", error);
    } else {
        console.log("File uploaded successfully:", data);
        // If you want to display the uploaded image, you can set the imageSrc state.
    }
};
