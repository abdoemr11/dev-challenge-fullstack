import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
let authData: any = undefined;
export async function getCatBreads(): Promise<Breed[]> {
    const res = await fetch(`https://api.thecatapi.com/v1/breeds`, {
        headers: {
            "x-api-key":
                "live_lWWKFAqD37hI6VvI9Ssou26bRvqk8Vrq8W4Yfdk1T2FqbfiAptBUEQ1JNIFbFloS",
        },
    });
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export async function getSingleCat(id: string): Promise<Breed> {
    try {
        const res = await fetch(`https://api.thecatapi.com/v1/breeds/${id}`, {
            headers: {
                "x-api-key":
                    "live_lWWKFAqD37hI6VvI9Ssou26bRvqk8Vrq8W4Yfdk1T2FqbfiAptBUEQ1JNIFbFloS",
            },
        });
        return res.json();
    } catch (error) {
        // This will activate the closest `error.js` Error Boundary
        console.log(error);
        return {} as Breed;
        // throw new Error("Failed to get single cat");
    }
}
let counter = 0;
export async function getBreedImages(id: string): Promise<CatImage[]> {
    try {
        console.log("tring to get image with id = ", id);
        const res = await fetch(
            `https://api.thecatapi.com/v1/images/search?breed_ids=${id}&limit=9`,
            {
                headers: {
                    "x-api-key":
                        "live_lWWKFAqD37hI6VvI9Ssou26bRvqk8Vrq8W4Yfdk1T2FqbfiAptBUEQ1JNIFbFloS",
                },
            }
        );
        console.log("from getting the breed images", res.ok);
        return res.json();
    } catch (error) {
        console.log("Failed to fetch the breed images with id: ", id, error);
        // throw new Error("Failed to fetch the breed images");
        //return default image
        return [];
    }
}

export async function registerCatSearch(id: string): Promise<void> {
    try {
        if (!authData) await authinticatePB();

        const data = {
            cat_id: id,
        };
        const record = await pb.collection("cat_trends").create(data);
    } catch (error) {
        console.log(error);
    }
}
type CatRecord = { cat_id: string };
export async function getTopSearchedCat(): Promise<CatRecord[]> {
    if (!authData) await authinticatePB();
    const records = await pb.collection("most_searched_cats").getFullList();
    return records.slice(0, 10) as unknown as CatRecord[];
}
interface CatWithImage {
    catId: string;
    imageUrl: string;
    breedName: string;
    description: string;
}
export async function getBreedWithImages(catIds: { cat_id: string }[]) {
    const breeds = await getCatBreads();
    const catImages: CatWithImage[] = await Promise.all(
        catIds.map(async (tb) => {
            const breedImage = await getBreedImages(tb.cat_id);
            console.log("image id", tb.cat_id, tb.cat_id);
            const breed = breeds.find((br) => br.id === tb.cat_id);
            const breedName = breed?.name || "";
            const desc = breed?.description || "";
            const x: CatWithImage = {
                catId: tb.cat_id,
                imageUrl: breedImage.length !== 0 ? breedImage[0].url : "",
                breedName: breedName,
                description: desc,
            };
            return x;
        })
    );
    return catImages;
}
async function authinticatePB() {
    try {
        console.log("authenticating", process.env.PB_MAIL as string);

        authData = await pb.admins.authWithPassword(
            process.env.PB_MAIL as string,
            process.env.PB_PASS as string
        );
    } catch (error) {
        console.log(error);
    }
}
