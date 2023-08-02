import { create } from "zustand";

interface ImageStore {
    searchLabel: string;
    userSearched: (keyword: string) => void;
}
const useImageStore = create<ImageStore>((set) => ({
    searchLabel: "",
    userSearched: (keyword) => set({ searchLabel: keyword }),
}));

export default useImageStore;
