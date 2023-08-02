"use client";
import { PostgrestResponse } from "@supabase/supabase-js";
import supabase from "../../utils/supa";
import ImageWithInfo from "./ImageWithInfo";
import useSwr from "swr";
import useImageStore from "@/app/hooks/useImageStore";
const fetcher = async () => {
    const { data, error } = await supabase.from("unsplash").select("*");
    if (error) {
        throw new Error("Error fetching data");
    }
    return data;
};
export default function Gallery() {
    const { searchLabel } = useImageStore();
    const { data: images, error } = useSwr(searchLabel, fetcher);

    if (!images && !Array.isArray(images)) return <p>no images</p>;
    return (
        <section className=" columns-3 gap-4 space-y-4 mt-20">
            {images.map((image) => {
                return <ImageWithInfo key={image.id} image={image} />;
            })}
        </section>
    );
}
