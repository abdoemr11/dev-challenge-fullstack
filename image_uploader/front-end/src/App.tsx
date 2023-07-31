import { useState } from "react";
import "./App.css";
import AcceptImage from "./components/AcceptImage";
import Uploading from "./components/Uploading";
import Uploaded from "./components/Uploaded";
function App() {
    const [uploadState, setUploadState] = useState<
        "accept" | "uploading" | "uploaded"
    >("accept");

    return (
        <>
            {uploadState === "accept" ? (
                <AcceptImage />
            ) : uploadState === "uploading" ? (
                <Uploading />
            ) : uploadState === "uploaded" ? (
                <Uploaded />
            ) : null}
        </>
    );
}

export default App;
