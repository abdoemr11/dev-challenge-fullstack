import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function useSupaBase() {
    let [supabase, setSupabase] = useState<SupabaseClient>();
    useEffect(() => {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

        const client = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_KEY);
        setSupabase(client);
    }, []);

    const insertImageWithMetadat = async (
        label: string,
        password: string,
        imagePath: string,
        imageUrl: string
    ) => {
        try {
            console.log("inserting into the database");
            if (!supabase) throw new Error("can't find supabase client");

            await supabase.from("unsplash").insert({
                image_path: imagePath,
                image_label: label,
                image_password: password,
                image_url: imageUrl,
            });
        } catch (error) {
            console.error("Error inserting image metadata:", error);
        }
    };

    const uploadImage = async (file: File) => {
        console.log("uploading image");

        if (!supabase) throw new Error("can't find supabase client");

        const formData = new FormData();
        formData.append("file", file);
        const filename = generateUniqueFilename(file);

        const { data: imageData, error } = await supabase.storage
            .from("images")
            .upload(`${filename}`, file, {
                cacheControl: "3600", // optional caching setting
            });

        if (error) {
            console.error("Error uploading file:", error);
            throw new Error("failed to upload the image");
        }
        const imagePublicUrl = supabase.storage
            .from("images")
            .getPublicUrl(imageData.path).data.publicUrl;
        return { imagePublicUrl, imagePath: imageData.path };
    };
    return { uploadImage, insertImageWithMetadat };
}

const sanitizeFilename = (filename: string) => {
    // Replace any characters that are not letters, numbers, underscores, or dots with underscores
    return filename.replace(/[^a-zA-Z0-9_.]/g, "_");
};

const generateUniqueFilename = (file: File) => {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 8);
    const sanitizedFilename = sanitizeFilename(file.name);
    return `unsplash/${timestamp}_${randomString}_${sanitizedFilename}`;
};
