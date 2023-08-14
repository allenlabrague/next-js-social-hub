"use client";

import { Button, Input, Image } from "@nextui-org/react";
import { MdEmail } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible, AiFillLock } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All field are necessary");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    setLoading(true);

    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists");
        setLoading(false);
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        setError("Registered successfully");
        form.reset();
        setLoading(false);
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        console.log("User registration failed");
        setLoading(false);
      }
    } catch (error) {
      console.log("Error during registration ", error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <div className="flex flex-col gap-3">
        <Input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Username"
          size="lg"
          startContent={<CgProfile fontSize={20} color="gray" />}
        />
        <Input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          size="lg"
          startContent={<MdEmail fontSize={20} color="gray" />}
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          type={`${showPassword ? "text" : "password"}`}
          placeholder="Password"
          size="lg"
          startContent={<AiFillLock fontSize={20} color="gray" />}
          endContent={
            <div className="flex items-center">
              <button
                size="sm"
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
      {error && <div className="text-center text-gray-400 mt-5">{error}</div>}
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
            "Create Account"
          )}
        </Button>
      </div>
      <p className="text-center text-sm mt-5 text-gray-400">
        By creating an account, you agree to our{" "}
        <span className="font-medium text-black dark:text-white">
          Terms of Service
        </span>{" "}
        and{" "}
        <span className="font-medium text-black dark:text-white">
          Privacy & Cookie Statement.
        </span>
      </p>
    </form>
  );
};

export default SignUp;
