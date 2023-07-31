import { FormEvent, useRef, useState } from "react";
import uploadImg from "../assets/image.svg";
import { uploadImage } from "../supabase";

function AcceptImage() {
    const ref = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (ref.current) ref.current.click();
    };

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        if (!event.dataTransfer?.files) return;
        const file = event.dataTransfer.files[0];

        if (file && file.type.startsWith("image/")) {
            uploadImage(file);
        } else {
            alert("Only image files are allowed!");
        }
    };
    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            uploadImage(file);
        } else {
            alert("Only image files are allowed!");
        }
    };

    return (
        <main
            className=" w-[25.125rem] bg-white  mx-auto mt-48 rounded-xl font-pop font-medium p-9
                 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.10)]"
        >
            <h1 className="text-lg text-[#4f4f4f] mb-4">Upload your image</h1>
            <p className=" text-[.625rem] text-[#828282] mb-7">
                File should be Jpeg, Png,...
            </p>
            <section
                className="bg-[#F6F8FB] pt-9 pb-10 border border-dashed border-[#97BEF4] rounded-xl"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <img src={uploadImg} alt="upload image" className="mx-auto" />
                <p className="text-xs tracking-tight text-[#bdbdbd] mt-9 ">
                    Drag & Drop your image here
                </p>
            </section>
            <p className="text-xs text-[#bdbdbd] mt-5 mb-7">Or</p>
            <button
                className="text-white text-xs py-2 px-4 bg-[#2F80ED] rounded-lg font-noto"
                onClick={handleClick}
            >
                Choose a file
            </button>
            <input
                ref={ref}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleInputChange}
            />
        </main>
    );
}

export default AcceptImage;
