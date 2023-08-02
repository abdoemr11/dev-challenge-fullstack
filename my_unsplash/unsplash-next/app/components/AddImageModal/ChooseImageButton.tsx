import { useRef } from "react";
export default function ChooseImageButton({
    handleChooseImage,
}: {
    handleChooseImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    const ref = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        ref.current?.click();
    };
    return (
        <>
            <button
                className="text-white bg-gray-500 py-3 px-6 rounded-xl "
                onClick={handleClick}
                type="button"
            >
                Choose a file
            </button>
            <input
                ref={ref}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleChooseImage}
                required
            />
        </>
    );
}
