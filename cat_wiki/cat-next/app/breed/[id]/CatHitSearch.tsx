"use client";
import { registerCatSearch } from "@/app/utils/cats";
import { useEffect } from "react";
export default function CatHitSearch({ catId }: { catId: string }) {
    useEffect(() => {
        const searchTheCat = async () => {
            await registerCatSearch(catId);
        };
        searchTheCat();
    }, []);
    return <div></div>;
}
