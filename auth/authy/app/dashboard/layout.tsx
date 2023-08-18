import logo from "@/app/assets/devchallenges.svg";
import { log } from "console";
import Image from "next/image";
export default function Layout() {
    return (
        <main className="container py-6 mx-auto px-8 sm:px-16">
            <header className="flex justify-between">
                <Image alt="dev challenge" src={logo} className="mb-6" />
                <section>
                    <Image
                        width={32}
                        height={3 * 16}
                        src={logo}
                        alt="username"
                    />
                    <div className="dropdown">
                        <label tabIndex={0} className="btn m-1">
                            Click
                        </label>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <a>Item 1</a>
                            </li>
                            <li>
                                <a>Item 2</a>
                            </li>
                        </ul>
                    </div>
                </section>
            </header>
            <footer>
                <p>created by abdoemr11</p>
                <p>devchallenges.com</p>
            </footer>
        </main>
    );
}
