"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-180px)] flex-col gap-y-8">
            <h2 className="font-bold text-xl">Something went wrong: </h2>
            <p className="font-medium">{error.message}</p>
            <button
                className="border p-4 bg-slate-300"
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    );
}
