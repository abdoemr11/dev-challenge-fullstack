import { getCatBreads, getSingleCat } from "../utils/cats";
import ProgressChart from "./ProgressChart";

export default async function Page({ params }: { params: { id: string } }) {
    const cat = await getSingleCat(params.id);
    console.log(cat, params.id);

    return (
        <div>
            <section className="flex flex-wrap gap-x-24">
                {" "}
                <aside></aside>
                <aside className="[&>div>span]:font-bold">
                    <h1>{cat.name}</h1>
                    <p>{cat.description}</p>
                    <div>
                        <span>Temperament:</span>
                        {cat.temperament}
                    </div>
                    <div>
                        <span>Origin:</span>
                        {cat.origin}
                    </div>
                    <div>
                        <span>Life Span:</span>
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
                </aside>
            </section>
            <section>
                <h2>Other photos</h2>
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
