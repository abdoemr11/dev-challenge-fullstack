export default function TrendBreeds() {
    return (
        <section className="bg-[#E3E1DC] py-10 px-7 sm:px-28">
            <div>
                <h2 className="text-primary text-lg font-medium">
                    Most Searched Breeds
                </h2>
                <span className="bg-[#4D270C] w-16 h-1 block"></span>
            </div>
            <p className="text-5xl font-bold text-primary mb-12">
                66+ Breeds For you to discover
            </p>
            <div className="">
                <div className="text-[#29150799] justify-end sm:text-left mt-16 flex items-center gap-4 mb-8">
                    SEE MORE
                    <span className="material-icons-outlined text-[#7F736A]">
                        trending_flat
                    </span>
                </div>
                <div className="flex flex-wrap gap-12">
                    {[1, 2, 3, 4].map((im) => (
                        <div
                            key={im}
                            className="w-[300px] h-[300px] bg-green-800"
                        ></div>
                    ))}
                </div>
            </div>
        </section>
    );
}
