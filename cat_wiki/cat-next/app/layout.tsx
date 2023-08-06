import "./globals.css";
import type { Metadata } from "next";
import { Mystery_Quest, Montserrat } from "next/font/google";
import Image from "next/image";
import catLogo from "./assets/CatwikiLogo.svg";
const mystery = Mystery_Quest({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-mystery",
});
const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-montserrat",
});
export const metadata: Metadata = {
    title: "Cat Wiki",
    description: "For Cat Lovers",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${montserrat.variable} ${mystery.variable}`}
        >
            <body
                className={
                    montserrat.className +
                    "container mx-auto px-4 sm:px-8 md:px-10 py-4"
                }
            >
                <header className={mystery.className + ""}>
                    <Image src={catLogo} alt="Cat Logo" />
                </header>
                {children}
                <footer className="bg-black py-6 px-7 md:px-24 rounded-t-[4rem] flex flex-wrap justify-between text-xs">
                    <Image src={catLogo} alt="Cat Logo" className=" invert" />
                    <p className="text-white  ">
                        <span className="text-2xl align-middle mr-2">©</span>
                        <span>created by abdoemr11 - devChallenge.io 2021</span>
                    </p>
                </footer>
            </body>
        </html>
    );
}
