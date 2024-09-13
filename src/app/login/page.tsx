"use client";

import TForm from "@/components/Forms/TForm";
import TInput from "@/components/Forms/TInput";
import Image from "next/image";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { MdLogin } from "react-icons/md";
import taskImg from "@/assets/task.jpg";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { credentialSchema } from "@/schema/credential.schema";

const LoginPage = () => {
  const router = useRouter()

  //login as user
  const handleLogin: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Login in, Please wait...");
    try {
      const result = await signIn("credentials", {
        redirect: false, // Prevent automatic redirection to handle error display
        email: values.email,
        password: values.password,
        callbackUrl: '/'
      },
    );

      if (result?.error) {
        console.error("Error during login:", result.error);
        toast.error(result.error, { id: toastId, duration: 2000 });
      } else {
        // Successful login
        router.push('/');
        toast.success("Login Successful!", { id: toastId, duration: 2000 });
        
      }
    } catch (error: any) {
      console.error("Error during login:", error.message);
      toast.error(error.message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col justify-between gap-10 lg:flex-row">
        <Image
          src={taskImg}
          alt=""
          width={500}
          height={500}
          className=" rounded-lg "
        />
        <div className="shadow-xl p-10 rounded-md w-80 md:w-96">
          <h2 className="text-2xl font-bold uppercase text-center mb-5">
            Login<span className="text-[#004E7C]"> Here !</span>
          </h2>
          <TForm onSubmit={handleLogin} resolver={zodResolver(credentialSchema)}>
            <TInput
              type="email"
              name="email"
              placeholder="Enter your email"
            />
            <TInput
              type="password"
              name="password"
              placeholder="Enter your Password"
              className="mt-4"
            />
            <button className="btn primary-btn mt-4 w-full">
              <MdLogin className="text-xl" />
              Login{" "}
            </button>
          </TForm>
          <div className="mt-3 flex gap-2 text-sm mb-3">
            <p>Dont have an account?</p>
            <Link href="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
