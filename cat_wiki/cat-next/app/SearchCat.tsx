"use client";
import Link from "next/link";
import { useState } from "react";

export default function SearchCat({ breeds }: { breeds: Breed[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);

    const filteredBreeds = breeds.filter((breed) =>
        breed.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <div className="relative ">
            <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={openModal}
                type="text"
                className="block w-full py-2 px-3 md:py-6 md:px-7 rounded-3xl md:rounded-[3.25rem] outline-1"
            />
            {showModal && (
                <div
                    className="absolute bg-white p-4 rounded-3xl w-full top-[calc(100%+1rem)] z-20 max-h-[220px] 
                    shadow-md overflow-y-scroll"
                    onClick={closeModal}
                >
                    <ul>
                        {filteredBreeds.map((breed, index) => (
                            <li
                                key={index}
                                className="hover:bg-[#9797971A] py-4 cursor-pointer"
                            >
                                <Link href={`breed/${breed.id}`}>
                                    {breed.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
