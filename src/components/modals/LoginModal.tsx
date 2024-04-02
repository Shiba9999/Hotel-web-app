"use client";

import axios from "axios";
import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { GrGithub } from "react-icons/gr";
import useLoginModal from "@/app/hooks/useLoginModal";
import {  signIn } from "next-auth/react"
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const router=useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    })
    .then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
     toast.success("Logged In")
     router.refresh()
     loginModal.onClose()
      }else if(callback?.error) {
        toast.error(callback.error);
      }
    })
     
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="welcome back" subtitle="Login to your account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required={true}
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required={true}
      />
    </div>
  );
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      {/* <Button
        onClick={() => {}}
        outline
        label="Countinue with Google"
        icon={FcGoogle}
      />
      <Button
        onClick={() => signIn("github")}
        outline
        label="Countinue with Github"
        icon={GrGithub}
      /> */}
      <div className="text-neutral-500 text-center mt-4 font-light ">
        <div className=" justify-center flex flex-row items-center gap-2">
          <div>Already have an account ?</div>
          <div
            onClick={loginModal.onClose}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Countinue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
