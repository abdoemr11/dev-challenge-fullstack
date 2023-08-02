"use client";
import { PostgrestResponse } from "@supabase/supabase-js";
import supabase from "../../utils/supa";
import ImageWithInfo from "./ImageWithInfo";
import useSwr from "swr";
const fetcher = async () => {
    const { data, error } = await supabase.from("unsplash").select("*");
    if (error) {
        throw new Error("Error fetching data");
    }
    return data;
};
export default function Gallery() {
    const { data: images, error } = useSwr("images", fetcher);
    console.log(images, error);
    if (!images && !Array.isArray(images)) return <p>no images</p>;

    return (
        <section className=" columns-3 gap-4 space-y-4 mt-20">
            {images.map((image) => {
                return <ImageWithInfo key={image.id} image={image} />;
            })}
        </section>
    );
}

// const getAllImages = async (): Promise<ImageRecord[]> => {
//     let imageRecords: ImageRecord[] = [];
//     if (!supabase) return imageRecords;
//     const { data, error }: PostgrestResponse<ImageRecord> = await supabase
//         .from("unsplash")
//         .select("*");
//     console.log("from get all images", data);
//     return data || imageRecords;
// };
