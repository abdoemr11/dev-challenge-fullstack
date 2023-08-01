import { useAppState } from "../store";
import Header from "./Header";
import { useState, useRef } from "react";

function Uploaded() {
    const previewImage = useAppState((state) => state.imageUrl);
    const [copied, setCopied] = useState(false);
    const linkRef = useRef<HTMLInputElement>(null);

    const handleCopyClick = async () => {
        if (!linkRef.current) {
            return;
        }
        try {
            await navigator.clipboard.writeText(linkRef.current.value);
            linkRef.current.select();
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Error copying to clipboard:", error);
        }
    };
    return (
        <section className="px-8">
            <span className="material-icons-outlined text-white rounded-full bg-[#219653] ">
                done
            </span>
            <Header text="Uploaded Successfully!" />
            <img src={previewImage} className="h-[14rem] max-w-full my-6" />
            <div className="flex rounded-lg border border-[#E0E0E0] bg-[#F6F8FB] items-center gap-4">
                <input
                    ref={linkRef}
                    className=" overflow-hidden whitespace-nowrap overflow-ellipsis
                     text-[.5rem] text-[#4F4F4F] ml-2 w-full outline-none "
                    value={previewImage}
                    contentEditable={false}
                />
                <button
                    onClick={handleCopyClick}
                    className="text-white text-xs py-2 px-4 bg-mblue rounded-lg  text-[.5rem] min-w-fit "
                >
                    {copied ? "Copied!" : "Copy Link"}
                </button>
            </div>
        </section>
    );
}

export default Uploaded;
