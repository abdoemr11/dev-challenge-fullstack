import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { useAppState } from "./store";
import { useEffect } from "react";

export default function useSupaBase() {
    const [supabase, uploadingImage, uploadedImage, intializeSupabase] =
        useAppState((state) => [
            state.supabase,
            state.uploadingImage,
            state.uploadedImage,
            state.intializeSupa,
        ]);
    useEffect(() => {
        intializeSupabase();
    }, []);
    const uploadImage = async (file: File) => {
        console.log("uploading image");

        if (!supabase) throw new Error("can't find supabase client");
        console.log("is there supabase client", supabase);

        uploadingImage();

        const formData = new FormData();
        formData.append("file", file);
        const filename = generateUniqueFilename(file);

        const { data, error } = await supabase.storage
            .from("images")
            .upload(`${filename}`, file, {
                cacheControl: "3600", // optional caching setting
            });

        if (error) {
            console.error("Error uploading file:", error);
        } else {
            const { data } = supabase.storage
                .from("images")
                .getPublicUrl(filename);
            console.log("File uploaded successfully:", data);
            uploadedImage(data.publicUrl);
        }
    };
    return [uploadImage];
}

const sanitizeFilename = (filename: string) => {
    // Replace any characters that are not letters, numbers, underscores, or dots with underscores
    return filename.replace(/[^a-zA-Z0-9_.]/g, "_");
};

const generateUniqueFilename = (file: File) => {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 8);
    const sanitizedFilename = sanitizeFilename(file.name);
    return `image_uploads/${timestamp}_${randomString}_${sanitizedFilename}`;
};
