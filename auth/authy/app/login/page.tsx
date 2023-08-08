"use client";
import Image from "next/image";
import logo from "../assets/devchallenges.svg";
import googleLogo from "../assets/Google.svg";
import twitterLogo from "../assets/Twitter.svg";
import fbLogo from "../assets/Facebook.svg";
import githubLogo from "../assets/Gihub.svg";
import Link from "next/link";
import { logInToGithub, logInToGoogle } from "../libs/pocketbase";
export default function Page() {
    return (
        <section className="py-4 px-5 ">
            <Image alt="dev challenge" src={logo} className="mb-6" />
            <h1 className="font-semibold text-lg text-[#333] mb-3">
                Join thousands of learners from around the world{" "}
            </h1>
            <p className="mb-9">
                Master web development by making real-life projects. There are
                multiple paths for you to choose
            </p>
            <div className="form-control w-full max-w-xs">
                <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered w-full max-w-xs mb-3"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full max-w-xs  mb-6"
                />
            </div>
            <button className="btn btn-primary btn-block">Button</button>

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
