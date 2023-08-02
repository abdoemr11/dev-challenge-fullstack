import {
    createClient,
    SupabaseClient,
    PostgrestResponse,
} from "@supabase/supabase-js";
import Image from "next/image";

export const dynamic = "auto";
export const revalidate = 1;
export default async function Gallery() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

    const client = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_KEY);
    const images = await getAllImages(client);

    if (!images && !Array.isArray(images)) return <p>no images</p>;

    return (
        <section className=" columns-3 gap-4 space-y-4 mt-20">
            {images.map((image) => {
                return (
                    <Image
                        src={image.image_path}
                        alt={image.image_label}
                        key={image.id}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-auto  h-auto"
                    />
                );
            })}
        </section>
    );
}

const getAllImages = async (
    supabase: SupabaseClient
): Promise<ImageRecord[]> => {
    let imageRecords: ImageRecord[] = [];
    if (!supabase) return imageRecords;
    const { data, error }: PostgrestResponse<ImageRecord> = await supabase
        .from("unsplash")
        .select("*");
    return data || imageRecords;
};
