"use client";
import React, { useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "@/services/auth";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
  })
  .required();

const ForgotPass = () => {
  const [ForgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation();
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    ForgotPassword({
      email: data.email.toLowerCase(),
    })
    reset();
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    }
}, [isSuccess]);

return (
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
          name="email"
          label="email"
          type="email"
          register={register}
          error={errors.email}
      />
      <Button type="submit" 
          className="btn btn-dark block w-full text-center" 
          text="Send recovery email" 
          isLoading={isLoading} disabled={isLoading} 
      />
  </form>
);
};

export default ForgotPass;
