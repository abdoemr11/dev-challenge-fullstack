import Image from "next/image";
import catLogo from "./assets/CatwikiLogo.svg";
import masterCat from "./assets/HeroImagesm.png";
import masterCatSm from "./assets/HeroImagelg.png";
import SearchCat from "./SearchCat";
import { getCatBreads } from "./utils/cats";
import TrendBreeds from "./components/TrendBreeds";
import Article from "./components/Article";

export default async function Home() {
    let breeds: Breed[] = [];
    try {
        breeds = await getCatBreads();
    } catch (error) {
        console.log(error);
    }
    return (
        <main>
            <header className="bg-black flex justify-between  px-7 md:px-28 rounded-t-[4rem] ">
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
                <section className="w-1/2 sm:w-2/3 flex items-center">
                    <Image
                        alt="Master Cat"
                        src={masterCat}
                        className="h-[calc(100%-20px)] sm:h-full "
                    />
                </section>
            </header>
            <TrendBreeds />
            <Article />
        </main>
    );
}
