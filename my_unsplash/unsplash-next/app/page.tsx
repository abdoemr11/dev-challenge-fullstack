import Image from "next/image";
import AddImageButton from "./components/AddImageButton";
export default function Home() {
    return (
        <main className="container mx-auto px-4 sm:px-8 mt-4">
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
                        <input
                            type="text"
                            placeholder="Search by Name"
                            className="flex-1  placeholder:text-[#BDBDBD] pl-10 pr-4 py-2 border border-[#BDBDBD] rounded-md focus:outline-none"
                        />
                    </div>
                </div>
                <AddImageButton />
            </header>
        </main>
    );
}
