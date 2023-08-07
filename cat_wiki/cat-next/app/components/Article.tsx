import Image from "next/image";
import image1 from "../assets/image 1.png";
import image2 from "../assets/image 2.png";
import image3 from "../assets/image 3.png";
export default function Article() {
    return (
        <section className="py-8 sm:py-24 flex flex-wrap gap-x-6">
            <div className="basis-[350px]">
                <div className="w-16 h-1 bg-[#4D270C]"></div>
                <h3 className="text-primary text-5xl font-bold mt-4 mb-11">
                    Why should you have a cat?
                </h3>
                <p className="font-medium text-lg text-primary ">
                    Having a cat around you can actually trigger the release of
                    calming chemicals in your body which lower your stress and
                    anxiety leves
                </p>{" "}
                <div className="text-[#29150799] text-lg text-right sm:text-left mt-16 flex items-center gap-4 mb-8">
                    READ MORE
                    <span className="material-icons-outlined text-[#7F736A]">
                        trending_flat
                    </span>
                </div>
            </div>
            <div className=" columns-2 flex-1 ">
                <Image
                    src={image2}
                    alt="The importance of cat"
                    className="max-w-full"
                />
                <Image
                    src={image1}
                    alt="The importance of cat"
                    className="max-w-full ml-auto"
                />
                <Image
                    src={image3}
                    alt="The importance of cat"
                    className="max-w-full"
                />
            </div>
        </section>
    );
}
