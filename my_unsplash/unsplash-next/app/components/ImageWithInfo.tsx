import Image from "next/image";

export default function ImageWithInfo({ image }: { image: ImageRecord }) {
    return (
        <section>
            <Image
                src={image.image_path}
                alt={image.image_label}
                key={image.id}
                width={0}
                height={0}
                sizes="100vw"
                className="w-auto  h-auto"
            />
            <button></button>
        </section>
    );
}
