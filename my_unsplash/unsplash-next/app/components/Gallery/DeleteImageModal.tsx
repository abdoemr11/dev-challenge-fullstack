import { useState } from "react";
import supabase from "@/app/utils/supa";
import { useSWRConfig } from "swr";
import useImageStore from "@/app/hooks/useImageStore";

export default function DeleteImageModal({
    closeModal,
    isOpen,
    image,
}: {
    closeModal: () => void;
    isOpen: boolean;
    image: ImageRecord;
}) {
    const [password, setPassword] = useState("");
    const [passError, setPassError] = useState("");

    const { mutate } = useSWRConfig();
    const { searchLabel } = useImageStore();

    const removeImage = async () => {
        console.log("Trying to delete the image, ", image.id);
        if (image.image_password !== password) {
            console.error("You Entered wrong password");
            setPassError("You entered Wrong Password");
            return;
        }
        const { error: dbError } = await supabase
            .from("unsplash")
            .delete()
            .eq("id", image.id);
        if (dbError) {
            console.error(dbError);
            return;
        }

        const { data, error } = await supabase.storage
            .from("images")
            .remove([image.image_path]);
        closeModal();
        mutate(["key", searchLabel]);
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-30  bg-black bg-opacity-25">
            <div className="bg-white p-6   rounded-xl shadow-lg md:w-[38rem] top-1/2 absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h2 className="text-2xl font-medium mb-5 text-[#333]">
                    Are you sure?
                </h2>

                <div className="form-group">
                    <label
                        className="text-[#4F4F4F] text-sm font-medium mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        className="border border-[#4f4f4f] rounded-xl outline-none  w-full  placeholder:text-[#bdbdbd]
                    text-sm p-4 "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {passError !== "" ? (
                        <span className="text-ared text-sm">{passError}</span>
                    ) : (
                        ""
                    )}
                </div>

                <div className="mt-6 space-x-4 flex justify-end">
                    <button onClick={closeModal} className=" text-[#bdbdbd] ">
                        Cancel
                    </button>
                    <button
                        className="text-white bg-ared py-3 px-6 rounded-xl ml-auto 
                         disabled:bg-[#add6be]"
                        type="submit"
                        onClick={() => removeImage()}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
