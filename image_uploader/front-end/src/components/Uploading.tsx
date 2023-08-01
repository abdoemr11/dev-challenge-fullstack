import Header from "./Header";

function Uploading() {
    return (
        <section className=" text-left">
            <Header text="Uploading..." />
            <div className="bg-[#F2F2F2] h-[6px] rounded-lg mt-8">
                <div className="bg-mblue w-1/3 h-full rounded-lg moving-progress-bar"></div>
            </div>
        </section>
    );
}

export default Uploading;
