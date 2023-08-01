"use client";

import { useState } from "react";
import AddImageModal from "./AddImageModal";
export default function AddImageButton() {
    const [isOpenModal, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false);
    };
    const openModal = () => {
        setIsOpen(true);
    };
    return (
        <>
            <button
                className="text-white bg-[#3DB46D] py-4 px-5 rounded-xl ml-auto "
                onClick={openModal}
            >
                Add a photo
            </button>
            <AddImageModal isopen={isOpenModal} closeModal={closeModal} />
        </>
    );
}
