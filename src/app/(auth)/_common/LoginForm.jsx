"use client";
import React, { useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/ui/Checkbox";
import Link from "next/link";
import { useLoginMutation } from "@/services/auth";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is Required"),
  password: yup.string().required("Password is Required"),
}).required();

const LoginForm = () => {
  const router = useRouter();
  const [login, { data: credentials, isSuccess, isLoading }] = useLoginMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    if (!isLoading && isSuccess && credentials) {

      setTimeout(() => {
        router.push('/home');
      }, 1500);
    }
  }, [isSuccess, credentials]);

  const onSubmit = (data) => {
    login({
      email: data.email.toLowerCase(),
      password: data.password
    });
  };
  

  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Textinput
        name="email"
        label="email"
        type="text"
        placeholder="Enter your email"
        register={register}
        error={errors.email}
        autoComplete="current-email"
      />
      <Textinput
        name="password"
        label="passwrod"
        type="password"
        placeholder="Enter your password"
        register={register}
        error={errors.password}
        autoComplete="current-password"
      />
      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in"
        />
        <Link
          href="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password ?{" "}
        </Link>
      </div>
        <Button type="submit" text="Sign in" className="btn btn-dark block w-full text-center" isLoading={isLoading} disabled={isLoading} />
    </form>
);
};

export default LoginForm;
