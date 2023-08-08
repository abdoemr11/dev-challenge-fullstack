import Image from "next/image";
import {
    getBreedImages,
    getCatBreads,
    getSingleCat,
    registerCatSearch,
} from "../../utils/cats";
import ProgressChart from "./ProgressChart";
import CatHitSearch from "./CatHitSearch";

export default async function Page({ params }: { params: { id: string } }) {
    const cat = await getSingleCat(params.id);
    const images = await getBreedImages(params.id);
    await registerCatSearch(params.id);
    const coverImage = images[0];

    return (
        <div className="mb-24 sm:mb-44">
            <CatHitSearch catId={params.id} />
            <section className="flex flex-wrap justify-between gap-y-8">
                <aside>
                    <div className="relative">
                        {coverImage && (
                            <Image
                                src={coverImage.url}
                                key={coverImage.id}
                                alt={coverImage.id}
                                width={275}
                                height={275}
                                className="w-[278px] aspect-square relative   rounded-3xl
                         "
                            />
                        )}

                        <span className="absolute bg-[#DEC68B] -left-4 h-5/6 w-8 top-1/2 -translate-y-1/2 -z-10"></span>
                    </div>
                </aside>
                <aside className="  md:basis-2/3">
                    <h1 className="font-semibold text-[#291507] text-4xl mb-6">
                        {cat.name}
                    </h1>
                    <p className="font-medium text-[#291507] text-lg mb-9">
                        {cat.description}
                    </p>
                    <div className="grid gap-y-8 [&>div>span]:font-bold">
                        <div>
                            <span>Temperament: </span>
                            {cat.temperament}
                        </div>
                        <div>
                            <span>Origin: </span>
                            {cat.origin}
                        </div>
                        <div>
                            <span>Life Span: </span>
                            {cat.life_span}
                        </div>
                        <ProgressChart
                            value={cat.affection_level}
                            label="Affection Level"
                        />
                        <ProgressChart
                            value={cat.child_friendly}
                            label="Child Friendly"
                        />
                        <ProgressChart
                            value={cat.dog_friendly}
                            label="Dog Friendly"
                        />
                        <ProgressChart value={cat.grooming} label="Grooming" />
                        <ProgressChart
                            value={cat.intelligence}
                            label="Intelligence"
                        />
                        <ProgressChart
                            value={cat.health_issues}
                            label="Health Issues"
                        />
                        <ProgressChart
                            value={cat.social_needs}
                            label="Social Needs"
                        />
                        <ProgressChart
                            value={cat.stranger_friendly}
                            label="Stranger Friendly"
                        />
                    </div>
                </aside>
            </section>
            <section className="mt-20">
                <h2 className="font-semibold text-[#291507] text-4xl mb-10">
                    Other photos
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                    {images.slice(1).map((image) => (
                        <Image
                            src={image.url}
                            key={image.id}
                            alt={image.id}
                            width={300}
                            height={300}
                            className="w-[300px] rounded-3xl aspect-square"
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

export async function generateStaticParams() {
    const cats = await getCatBreads();

    return cats.map((cat) => ({
        id: cat.id,
    }));
}
