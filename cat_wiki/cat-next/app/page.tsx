import Image from "next/image";
import catLogo from "./assets/CatwikiLogo.svg";
import masterCat from "./assets/HeroImagesm.png";
import SearchCat from "./SearchCat";
import { getCatBreads } from "./utils/cats";

export default async function Home() {
    const breeds = await getCatBreads();
    return (
        <main>
            <header className="bg-black flex justify-between  px-7 md:px-[108px] rounded-t-[4rem] ">
                <aside className=" self-center py-6 ">
                    <Image
                        src={catLogo}
                        alt="Cat Logo"
                        className="invert hidden sm:block"
                    />
                    <span className="text-sm font-mystery text-white sm:hidden">
                        CatWiki
                    </span>
                    <p className=" text-[10px] sm:text-2xl text-white mt-3 mb-5 sm:mb-12">
                        Get to know more about your cat breed
                    </p>
                    <SearchCat breeds={breeds} />
                </aside>
                <section className="w-2/3 overflow-hidden">
                    <Image alt="Master Cat" src={masterCat} />
                </section>
            </header>
        </main>
    );
}
