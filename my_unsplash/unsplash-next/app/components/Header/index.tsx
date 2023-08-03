import AddImageButton from "@/app/components/AddImageButton";
import Image from "next/image";
import SearchInput from "./SearchInput";
export default function Header() {
    return (
        <header className="flex justify-between flex-wrap gap-y-8 ">
            <div className="flex flex-wrap gap-y-4">
                <Image
                    src="/my_unsplash_logo.svg"
                    alt="Unsplash Logo"
                    width={100}
                    height={100}
                />
                <div className="relative inline-flex items-center ">
                    <span className="material-icons-outlined absolute left-2 text-[#BDBDBD]">
                        search
                    </span>
                    <SearchInput />
                </div>
            </div>
            <AddImageButton />
        </header>
    );
}
