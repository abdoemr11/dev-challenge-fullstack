import Header from "./Header";

function Uploading() {
    return (
        <section
            className="max-w-[25.125rem] bg-white  mx-auto  rounded-xl font-pop font-medium p-9
        shadow-[0px_4px_12px_0px_rgba(0,0,0,0.10)] text-left"
        >
            <Header text="Uploading..." />
            <div className="bg-[#F2F2F2] h-[6px] rounded-lg mt-8">
                <div className="bg-mblue w-1/3 h-full rounded-lg moving-progress-bar"></div>
            </div>
        </section>
    );
}

export default Uploading;
