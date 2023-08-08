import PocketBase from "pocketbase";

const pb = new PocketBase("https://cat-wiki.pockethost.io");

export const isLoggedIn = () => {
    return pb.authStore.isValid;
};
export const logInToGoogle = async () => {
    const authData = await pb
        .collection("users")
        .authWithOAuth2({ provider: "google" });
};

export const logInToGithub = async () => {
    const authData = await pb
        .collection("users")
        .authWithOAuth2({ provider: "github" });
};
