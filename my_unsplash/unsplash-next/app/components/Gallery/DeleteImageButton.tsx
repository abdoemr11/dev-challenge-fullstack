"use client";

import { useState } from "react";
import DeleteImageModal from "./DeleteImageModal";

export default function DeleteImageButton({ image }: { image: ImageRecord }) {
    const [isDeleteRequested, setDeletedRequested] = useState(false);
    const closeModal = () => {
        setDeletedRequested(false);
    };
    const openDeleteModal = () => {
        setDeletedRequested(true);
    };
    return (
        <>
            <button
                className="text-ared border border-ared py-1 
                    px-4 rounded-3xl text-[10px] absolute right-4 top-4 hidden z-20"
                onClick={openDeleteModal}
            >
                delete
            </button>
            <DeleteImageModal
                closeModal={closeModal}
                isOpen={isDeleteRequested}
                image={image}
            />
        </>
    );
}
