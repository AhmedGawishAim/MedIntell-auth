"use client";

import React, { useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Checkbox from "@/components/ui/Checkbox";
import { useRouter } from "next/navigation";
import { useSignupMutation } from "@/services/auth";

const schema = yup
  .object({
    first_name: yup.string().required("First Name is Required"),
    last_name: yup.string().required("Last Name is Required"),

    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup
      .string()
      .min(6, "Password must be at least 8 characters")
      .max(20, "Password shouldn't be more than 20 characters")
      .required("Please enter password"),
    re_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

const RegForm = () => {
  const router = useRouter(); 
  const [checked, setChecked] = useState(false);
  const [showError, setShowError] = useState(false);
  const [signup, { data, isSuccess, isLoading }] = useSignupMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    if (!isLoading && isSuccess && data) {
      setTimeout(() => {
        router.push('/home');
      }, 1500);
    }
  }, [isSuccess, data]);


  const onSubmit = (data) => {
    if (!checked) {
      setShowError(true);
    } else {
      signup({...data, email: data.email.toLowerCase()})
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="first_name"
        label="first name"
        type="text"
        placeholder=" Enter your first name"
        register={register}
        error={errors.first_name}
      />
      <Textinput
        name="last_name"
        label="last name"
        type="text"
        placeholder=" Enter your last name"
        register={register}
        error={errors.last_name}
      />
      <Textinput
        name="email"
        label="email address"
        type="email"
        placeholder=" Enter your email"
        register={register}
        error={errors.email}
      />
      <Textinput
        name="password"
        label="passwrod"
        type="password"
        placeholder=" Enter your password"
        register={register}
        error={errors.password}
      />
      <Textinput
        name="re_password"
        label="confirm passwrod"
        type="password"
        placeholder="Confirm your password"
        register={register}
        error={errors.re_password}
      />
      <Checkbox
        name="checked"
        label="You accept our Terms and Conditions and Privacy Policy"
        value={checked}
        onChange={() => (setChecked(!checked), setShowError(false))}
      />
      {showError && (
        <div className=" mt-2  text-danger-500 block text-sm">
          Accept Our Terms And Conditions And Privacy Policy
        </div>
      )}

      <Button
        type="submit"
        text="Create an account"
        className="btn btn-dark block w-full text-center"
        isLoading={isLoading} disabled={isLoading}
      />
    </form>
  );
};

export default RegForm;
