import Image from "next/image";
import {
    getBreedImages,
    getBreedWithImages,
    getTopSearchedCat,
} from "../utils/cats";
export const dynamic = "force-dynamic";

export default async function Page() {
    const topBreeds = await getTopSearchedCat();
    const breeds = await getBreedWithImages(topBreeds);
    console.log(breeds);
    return (
        <div className="text-primary">
            <h1 className=" text-4xl font-bold mb-12">
                Top most searched breeds
            </h1>
            <div className=" space-y-14 mb-16">
                {breeds.map(
                    (br, i) =>
                        br.breedName !== "" && (
                            <div
                                className="flex justify-between gap-12"
                                key={br.catId}
                            >
                                <Image
                                    alt={br.breedName}
                                    src={br.imageUrl}
                                    width={200}
                                    height={200}
                                    className=" rounded-2xl aspect-square"
                                />
                                <section>
                                    <h2 className="text-4xl font-semibold mb-6">
                                        {i + 1}. {br.breedName}
                                    </h2>
                                    <p className="text-lg font-medium">
                                        {br.description}
                                    </p>
                                </section>
                            </div>
                        )
                )}
            </div>
        </div>
    );
}
