"use client";
import Image from "next/image";
import ChooseImageButton from "./ChooseImageButton";
import { useState } from "react";
import useSupaBase from "../../hooks/useSupabase";
export default function AddImageModal({
    isopen,
    closeModal,
}: {
    isopen: boolean;
    closeModal: () => void;
}) {
    const [previewImgSrc, setPreivewImgSrc] = useState("/image_preview.svg");
    const [imageFile, setImageFile] = useState<File>();
    const { uploadImage, insertImageWithMetadat } = useSupaBase();
    const [isUploading, setIsUploading] = useState(false);
    const [label, setLabel] = useState("");
    const [password, setPassword] = useState("");
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setImageFile(file);
            //for preview
            const reader = new FileReader();
            reader.onloadend = () => {
                // Read the file and set it as the preview image source
                setPreivewImgSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Only image files are allowed!");
        }
    };
    const uploadImageWithInfo = async () => {
        setIsUploading(true);
        if (!imageFile) {
            console.error("trying to upload the undefined image");
            setTimeout(() => setIsUploading(false), 1500);
            return;
        }
        try {
            const imagePath = await uploadImage(imageFile);
            await insertImageWithMetadat(label, password, imagePath);
        } catch (error) {
            console.log(error);
            setIsUploading(false);
        }
        setIsUploading(false);
        closeModal();
    };
    if (!isopen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25">
            <form className="bg-white p-6 rounded-xl shadow-lg md:w-[38rem]">
                <h2 className="text-2xl font-medium mb-5 text-[#333]">
                    Add a new photo
                </h2>
                <div className="grid gap-y-5">
                    <div className="form-group">
                        <label
                            className=" text-[#4F4F4F] text-sm font-medium  mb-2"
                            htmlFor="label"
                        >
                            Label
                        </label>
                        <input
                            id="label"
                            name="label"
                            className="border border-[#4f4f4f] rounded-xl outline-none  w-full placeholder:text-[#bdbdbd]
                            text-sm p-4  "
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label
                            className="text-[#4F4F4F] text-sm font-medium mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            className="border border-[#4f4f4f] rounded-xl outline-none  w-full  placeholder:text-[#bdbdbd]
                            text-sm p-4 "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group flex justify-between items-center">
                        <Image
                            src={previewImgSrc}
                            height={100}
                            width={100}
                            alt="preview image"
                        />
                        <ChooseImageButton
                            handleChooseImage={handleInputChange}
                        />
                    </div>
                </div>
                <div className="mt-6 space-x-4 flex justify-end">
                    <button onClick={closeModal} className=" text-[#bdbdbd] ">
                        Cancel
                    </button>
                    <button
                        className="text-white bg-[#3DB46D] py-3 px-6 rounded-xl ml-auto 
                                 disabled:bg-[#add6be]"
                        disabled={isUploading}
                        onClick={uploadImageWithInfo}
                        type="submit"
                    >
                        {!isUploading ? "Submit" : "uploading"}
                    </button>
                </div>
            </form>
        </div>
    );
}
