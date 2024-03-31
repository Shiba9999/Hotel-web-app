"use client";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";

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
        console.log("err", err);
        return Promise.reject(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  const bodyContent =(
    <div className="flex flex-col gap-4">
       <Heading 
       title="welcome to Airbnb"
       subtitle="Create an Account"
     
       />
     <Input 
     id="email"
     label="Email"
     disabled={isLoading}
     register={register}
     errors={errors}
     required={true}
     />
     <Input 
     id="email"
     label="Email"
     disabled={isLoading}
     register={register}
     errors={errors}
     required={true}
     />
    </div>
  )
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Countinue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default RegisterModal;
