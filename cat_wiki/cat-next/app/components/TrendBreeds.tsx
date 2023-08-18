import Image from "next/image";
import {
    getBreedImages,
    getBreedWithImages,
    getCatBreads,
    getTopSearchedCat,
} from "../utils/cats";
import Link from "next/link";
interface CatWithImage {
    catId: string;
    imageUrl: string;
    breedName: string;
}

export default async function TrendBreeds() {
    const topBreeds = await getTopSearchedCat();
    const breeds = await getBreedWithImages(topBreeds);
    console.log(breeds);
    return (
        <section className="bg-[#E3E1DC] py-10 px-7 sm:px-28">
            <div>
                <h2 className="text-primary text-lg font-medium">
                    Most Searched Breeds
                </h2>
                <span className="bg-[#4D270C] w-16 h-1 block"></span>
            </div>
            <p className="text-5xl font-bold text-primary mb-12">
                66+ Breeds For you to discover
            </p>
            <div className="">
                <Link href="breeds">
                    <div className="text-[#29150799] justify-end sm:text-left mt-16 flex items-center gap-4 mb-8">
                        SEE MORE
                        <span className="material-icons-outlined text-[#7F736A]">
                            trending_flat
                        </span>
                    </div>
                </Link>
                <div className="flex flex-wrap gap-12">
                    {breeds.map(
                        (im) =>
                            im.imageUrl !== "" && (
                                <div key={im.catId}>
                                    <Link href={`breed/${im.catId}`}>
                                        <Image
                                            src={im.imageUrl}
                                            className="w-[300px] h-[300px] bg-green-800"
                                            alt={im.catId}
                                            width={300}
                                            height={300}
                                        />
                                        <h3 className="font-semibold text-lg text-primary py-4">
                                            {im.breedName}
                                        </h3>
                                    </Link>
                                </div>
                            )
                    )}
                </div>
            </div>
        </section>
    );
}
