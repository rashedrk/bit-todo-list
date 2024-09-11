"use client";
import Image from "next/image";
import React from "react";
import TForm from "@/components/Forms/TForm";
import TInput from "@/components/Forms/TInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { MdLogin } from "react-icons/md";
import taskImg from "@/assets/task.jpg";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister: SubmitHandler<FieldValues> = async (values) => {
    const toastId= toast.loading("Creating account, please wait...");
    try {
      const res = await axios.post("/api/auth/register", values);
      // console.log(res.data);
      if (res.data.success) {
        router.push("/login");
        alert();
        toast.success("Account created successfully", {id: toastId, duration: 2000});
      }
    } catch (e: any) {
      console.log(e.response.data.message);
      toast.error(e.response.data.message, {id: toastId, duration: 2000})
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
            Register<span className="text-[#004E7C]"> Here !</span>
          </h2>
          <TForm onSubmit={handleRegister}>
            <TInput
              type="text"
              name="username"
              placeholder="Enter an username"
              className="mb-4"
            />
            <TInput
              type="email"
              name="email"
              placeholder="Enter an email"
              className="mb-4"
            />
            <TInput
              type="password"
              name="password"
              placeholder="Enter a Password"
              className="mb-4"
            />
            <TInput
              type="password"
              name="confirmPassword"
              placeholder="Enter Password again"
            />
            <button className="btn primary-btn mt-4 w-full">
              <MdLogin className="text-xl" />
              Register
            </button>
          </TForm>

          <div className="mt-3 flex gap-2 text-sm mb-3">
            <p>Already have an account?</p>
            <Link href="/login"> Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
