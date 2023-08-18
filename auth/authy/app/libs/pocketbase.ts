import { redirect } from "next/navigation";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://cat-wiki.pockethost.io");

export const isLoggedIn = () => {
    return pb.authStore.isValid;
};
export const logInToGoogle = async () => {
    pb.authStore.clear();
    const authData = await pb
        .collection("users")
        .authWithOAuth2({ provider: "google" });
    console.log(authData);
    if (pb.authStore.isValid) redirect("dashboard");
};

export const logInToGithub = async () => {
    pb.authStore.clear();

    const authData = await pb
        .collection("users")
        .authWithOAuth2({ provider: "github" });
    console.log(authData, pb.authStore.isValid);
    if (pb.authStore.isValid) redirect("dashboard");
};
