"use client";
import React, { useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useForgotPaswordConfirmMutation } from "@/services/auth";

const schema = yup
    .object({
        new_password: yup
            .string()
            .min(6, "Password must be at least 8 characters")
            .max(20, "Password shouldn't be more than 20 characters")
            .required("Please enter password"),
        re_new_password: yup
            .string()
            .oneOf([yup.ref("new_password"), null], "Passwords must match"),
    })
    .required();

const ForgotPasswordConfirmForm = () => {
    const [forgotPaswordConfirm, { isSuccess, isLoading }] = useForgotPaswordConfirmMutation();

    const router = useRouter();
    const { uid, token } = useParams();

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
    });

    const onSubmit = (data) => {
        forgotPaswordConfirm({
            uid,
            token,
            ...data,
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
                name="new_password"
                label="new passwrod"
                type="password"
                placeholder="Enter your new password"
                register={register}
                error={errors.new_password}
                autoComplete="new-password"
            />
            <Textinput
                name="re_new_password"
                label="confirm passwrod"
                type="password"
                placeholder="Confirm your password"
                register={register}
                error={errors.re_new_password}
                autoComplete="re-new-password"
            />
            <Button type="submit" 
                className="btn btn-dark block w-full text-center" 
                text="Reset Password" 
                isLoading={isLoading} disabled={isLoading} 
            />
        </form>
    );
};

export default ForgotPasswordConfirmForm;