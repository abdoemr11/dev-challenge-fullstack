export async function getCatBreads(): Promise<Bread[]> {
    const res = await fetch(`https://api.thecatapi.com/v1/breeds`);
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export async function getSingleCat(id: string): Promise<Bread> {
    const res = await fetch(`https://api.thecatapi.com/v1/breeds/${id}`);
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}
