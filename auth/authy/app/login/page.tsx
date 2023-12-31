"use client";
import Image from "next/image";
import logo from "../assets/devchallenges.svg";
import googleLogo from "../assets/Google.svg";
import twitterLogo from "../assets/Twitter.svg";
import fbLogo from "../assets/Facebook.svg";
import githubLogo from "../assets/Gihub.svg";
import Link from "next/link";
import { isLoggedIn, logInToGithub, logInToGoogle } from "../libs/pocketbase";
import { redirect } from "next/navigation";
import { useEffect } from "react";
export default function Page() {
    useEffect(() => {
        console.log(isLoggedIn());
        // if (isLoggedIn()) {
        //     redirect("/");
        // }
    }, []);
    return (
        <section
            className=" sm:w-[30rem] py-4 px-5 sm:mx-auto sm:mt-16 sm:border sm:rounded-3xl
         sm:py-12 sm:px-14"
        >
            <Image alt="dev challenge" src={logo} className="mb-6" />

            <div className="form-control w-full  ">
                <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered   mb-3"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered   block  mb-6"
                />
                <button className="btn btn-primary btn-block">Login</button>
            </div>

            <div className="grid justify-center gap-6 py-6">
                <p>or continue with these social profile</p>
                <div className="flex gap-x-5 justify-center">
                    <Image
                        src={googleLogo}
                        alt="Google logo"
                        onClick={() => logInToGoogle()}
                    />
                    <Image src={fbLogo} alt="Facebook logo" />
                    <Image src={twitterLogo} alt="Twitter logo" />
                    <Image
                        src={githubLogo}
                        alt="Github logo"
                        onClick={() => logInToGithub()}
                    />
                </div>
                <div>
                    Don’t have an account yet?{" "}
                    <Link href={"/register"} className="text-primary">
                        Register
                    </Link>
                </div>
            </div>
        </section>
    );
}
