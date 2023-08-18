"use client";
import logo from "../assets/devchallenges.svg";

import { useEffect } from "react";
import { isLoggedIn } from "../libs/pocketbase";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Dashboard() {
    useEffect(() => {
        console.log(isLoggedIn());
        if (!isLoggedIn()) redirect("login");
    }, []);
    return (
        <main>
            <header></header>
        </main>
    );
}
