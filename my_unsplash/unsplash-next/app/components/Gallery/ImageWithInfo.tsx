"use client";
import Image from "next/image";
import supabase from "../../utils/supa";
import DeleteImageButton from "./DeleteImageButton";

export default function ImageWithInfo({ image }: { image: ImageRecord }) {
    return (
        <section className="relative [&:hover>button]:block [&:hover>p]:block  [&:hover>div]:block">
            <Image
                src={image.image_url}
                alt={image.image_label}
                width={0}
                height={0}
                sizes="100vw"
                className="w-auto  h-auto"
            />
            <DeleteImageButton image={image} />
            <p className="text-white text-lg font-bold absolute left-6 bottom-8 hidden z-10">
                {image.image_label}
            </p>
            <div className="absolute w-full h-full bg-black opacity-25 top-0 left-0 hidden"></div>
        </section>
    );
}
