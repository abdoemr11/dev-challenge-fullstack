import Image from "next/image";
import { getBreedImages, getCatBreads, getTopSearchedCat } from "../utils/cats";
import Link from "next/link";
interface CatWithImage {
    catId: string;
    imageUrl: string;
    breedName: string;
}
export default async function TrendBreeds() {
    const trendbreeds = await getTopSearchedCat();
    let breeds = await getCatBreads();

    const catImages: CatWithImage[] = await Promise.all(
        trendbreeds.map(async (tb) => {
            const breedImage = await getBreedImages(tb.cat_id);
            console.log("image id", tb.cat_id, tb.cat_id);
            const breedName =
                breeds && breeds.find((br) => br.id === tb.cat_id)?.name;
            const x: CatWithImage = {
                catId: tb.cat_id,
                imageUrl: breedImage.length !== 0 ? breedImage[0].url : "",
                breedName: breedName || "",
            };
            return x;
        })
    );
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
                    {catImages.map(
                        (im) =>
                            im.imageUrl !== "" && (
                                <div key={im.catId}>
                                    <Link href={im.catId}>
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
