"use client";

import { Button, Image, Input } from "@nextui-org/react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible, AiFillLock } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GithubLogo } from "./Logo";
import { useTheme } from "next-themes";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid credentials");
        setLoading(false);

        setTimeout(() => {
          setError("");
        }, 2000);

        return;
      }

      if (res.ok) {
        setLoading(false);
      }

      router.push("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Google Handler function
  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }
  // Facebook Handler function
  async function handleGithubSignin() {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  }
  return (
    <>
      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 mt-8">
          <Button
            fullWidth
            type="button"
            onClick={handleGithubSignin}
            startContent={<GithubLogo theme={useTheme().theme} />}
            className="bg-white dark:bg-[#3F3F46] dark:border-[#27272A] dark:hover:bg-[#27272A] border-2 border-gray hover:bg-gray-200"
            size="lg"
          >
            <h2 className="font-medium">Continue with Github</h2>
          </Button>
          <Button
            fullWidth
            type="button"
            onClick={handleGoogleSignin}
            startContent={
              <Image src="google-icon.svg" width={25} alt="github-logo" />
            }
            className="bg-white dark:bg-[#3F3F46] dark:border-[#27272A] dark:hover:bg-[#27272A] border-2 border-gray hover:bg-gray-200"
            size="lg"
          >
            <h2 className="font-medium">Continue with Google</h2>
          </Button>
        </div>
        <div className="flex items-center justify-center w-full my-8">
          <hr className="flex-grow border-t-2 border-gray-300 dark:border-[#3F3F46]" />
          <div className="mx-4 text-gray-500 text-sm">OR</div>
          <hr className="flex-grow border-t-2 border-gray-300 dark:border-[#3F3F46]" />
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <Input
              isRequired
              placeholder="Enter your email"
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
              startContent={<MdEmail fontSize={20} color="gray" />}
            />
          </div>
          <div>
            <Input
              isRequired
              placeholder="Enter your password"
              type={`${showPassword ? "text" : "password"}`}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              size="lg"
              startContent={<AiFillLock fontSize={20} color="gray" />}
              endContent={
                <div className="flex items-center">
                  <button
                    size="sm"
                    type="button"
                    className="focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </button>
                </div>
              }
            />
          </div>
        </div>
        {error && <div className="text-center text-gray-400 mt-5">{error}</div>}

        {/* Login Button */}
        <div className="mt-10">
          <Button
            fullWidth
            color="primary"
            type="submit"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <Button isLoading color="primary">
                Please wait...
              </Button>
            ) : (
              "Sign in with Social Hub"
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default Login;
