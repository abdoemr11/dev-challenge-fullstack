import { FormEvent, useRef, useState } from "react";
import uploadImg from "../assets/image.svg";
import useSupaBase from "../useSupabase";
import Header from "./Header";

function AcceptImage() {
    const ref = useRef<HTMLInputElement>(null);
    const [uploadImage] = useSupaBase();
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
        <section>
            <Header text="Upload your image" />
            <p className=" text-[.625rem] text-[#828282] mb-7 mt-4">
                File should be Jpeg, Png,...
            </p>
            <section
                className="bg-[#F6F8FB] pt-9 pb-10 border border-dashed border-[#97BEF4] rounded-xl cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={handleClick}
            >
                <img src={uploadImg} alt="upload image" className="mx-auto" />
                <p className="text-xs tracking-tight text-[#bdbdbd] mt-9 ">
                    Drag & Drop your image here
                </p>
            </section>
            <p className="text-xs text-[#bdbdbd] mt-5 mb-7">Or</p>
            <button
                className="text-white text-xs py-2 px-4 bg-mblue rounded-lg font-noto"
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
        </section>
    );
}

export default AcceptImage;
