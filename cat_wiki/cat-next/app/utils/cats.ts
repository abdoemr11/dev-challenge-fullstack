import { headers } from "next/dist/client/components/headers";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://cat-wiki.pockethost.io");
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

        throw new Error("Failed to fetch data");
    }
}

export async function getBreedImages(id: string): Promise<CatImage[]> {
    try {
    } catch (error) {}
    console.log(id);
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

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        console.log(res.status);
        throw new Error("Failed to fetch the breed");
    }

    return res.json();
}

export async function registerCatSearch(id: string): Promise<void> {
    if (!authData)
        authData = await pb.admins.authWithPassword(
            "abdoemr11@gmail.com",
            "123ASDzx.."
        );

    const data = {
        cat_id: id,
    };
    const record = await pb.collection("cat_trends").create(data);
    console.log(record);
}
