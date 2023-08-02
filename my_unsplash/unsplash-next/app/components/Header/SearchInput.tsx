"use client";

import useImageStore from "@/app/hooks/useImageStore";

export default function SearchInput() {
    const [label, userSearched] = useImageStore((state) => [
        state.searchLabel,
        state.userSearched,
    ]);
    return (
        <input
            value={label}
            onChange={(e) => userSearched(e.target.value)}
            type="text"
            placeholder="Search by Name"
            className="flex-1  placeholder:text-[#BDBDBD] pl-10 pr-4 py-2 border border-[#BDBDBD] rounded-md focus:outline-none"
        />
    );
}
