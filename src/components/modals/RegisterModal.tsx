"use client";
import useRegisterModal from "@/app/hooks/useRegisterModal";
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
const RegisterModal = () => {
  const registerModal = useRegisterModal();
  console.log("registerModal", registerModal);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => registerModal.onClose())
      .catch((err) => {
        toast.error("something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="welcome to Airbnb" subtitle="Create an Account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required={true}
      />
      <Input
        id="name"
        label="Name"
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
      <Button
        onClick={() => {}}
        outline
        label="Countinue with Google"
        icon={FcGoogle}
      />
      <Button
        onClick={() => {}}
        outline
        label="Countinue with Github"
        icon={GrGithub}
      />
      <div className="text-neutral-500 text-center mt-4 font-light ">
        <div className=" justify-center flex flex-row items-center gap-2">
          <div>Already have an account ?</div>
          <div
            onClick={registerModal.onClose}
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
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Countinue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
