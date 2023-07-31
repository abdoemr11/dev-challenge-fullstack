import "./App.css";
import AcceptImage from "./components/AcceptImage";
import Uploading from "./components/Uploading";
import Uploaded from "./components/Uploaded";
import { useAppState } from "./store";
function App() {
    const currentScreen = useAppState((state) => state.currentScreen);

    return (
        <main
            className="max-w-[25.125rem] bg-white  mx-auto  rounded-xl font-pop font-medium p-9
        shadow-[0px_4px_12px_0px_rgba(0,0,0,0.10)]"
        >
            {currentScreen === "acceptImage" ? (
                <AcceptImage />
            ) : currentScreen === "uploading" ? (
                <Uploading />
            ) : currentScreen === "uploaded" ? (
                <Uploaded />
            ) : null}
        </main>
    );
}

export default App;
