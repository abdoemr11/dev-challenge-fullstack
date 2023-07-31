import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { create } from "zustand";

interface AppState {
    imageUrl: string;
    supabase: SupabaseClient | undefined;
    currentScreen: "acceptImage" | "uploading" | "uploaded";

    intializeSupa: () => void;
    acceptImage: () => void;
    uploadingImage: () => void;
    uploadedImage: (url: string) => void;
}
export const useAppState = create<AppState>((set) => ({
    imageUrl: "0",
    currentScreen: "acceptImage",
    supabase: undefined,
    intializeSupa: () => {
        const client = createSupa();
        set({ supabase: client });
    },
    acceptImage: () => set({ currentScreen: "acceptImage" }),
    uploadingImage: () => set({ currentScreen: "uploading" }),
    uploadedImage: (url) => set({ imageUrl: url, currentScreen: "uploaded" }),
}));

const createSupa = () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

    return createClient(supabaseUrl, supabaseKey);
};
