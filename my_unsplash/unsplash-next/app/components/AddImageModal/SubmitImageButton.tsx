import { useState } from "react";
import { useSWRConfig } from "swr";
import useImageStore from "@/app/hooks/useImageStore";
import useSupaBase from "@/app/hooks/useSupabase";
export default function SubmitImageButton({
    imageFile,
    label,
    password,
    closeModal,
    setError,
}: {
    imageFile: File | undefined;
    label: string;
    password: string;
    closeModal: () => void;
    setError: (err: string) => void;
}) {
    const [isUploading, setIsUploading] = useState(false);
    const { uploadImage, insertImageWithMetadat } = useSupaBase();

    const { mutate } = useSWRConfig();
    const { searchLabel } = useImageStore();

    const uploadImageWithInfo = async () => {
        if (!imageFile || label === "" || password === "") {
            console.error("trying to upload the undefined image");
            setError("Please provide all image info");
            return;
        }
        setIsUploading(true);

        try {
            const imageData = await uploadImage(imageFile);
            await insertImageWithMetadat(
                label,
                password,
                imageData.imagePath,
                imageData.imagePublicUrl
            );
            mutate(["key", searchLabel]);
        } catch (error) {
            console.log(error);
            setIsUploading(false);
        }
        setIsUploading(false);
        closeModal();
    };
    return (
        <button
            className="text-white bg-[#3DB46D] py-3 px-6 rounded-xl ml-auto 
                 disabled:bg-[#add6be]"
            disabled={isUploading}
            onClick={uploadImageWithInfo}
            type="submit"
        >
            {!isUploading ? "Submit" : "uploading"}
        </button>
    );
}
