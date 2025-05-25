"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import  Link  from "next/link";
import Button from "@/components/ui/Button";
import Copyright from "@/components/ui/Copyright";
import { ToastContainer } from "react-toastify";
import { useParams } from "next/navigation";
import Logo from "@/assets/images/logo/logo.svg";
import { useActivateMutation } from "@/services/auth";

const activation = () => {
    const router = useRouter();
    const { uid, token } = useParams();

    const [activate, { isLoading, isSuccess, isError }] = useActivateMutation();


    const onSubmit = () => {
        activate({ "uid": uid, "token": token });
    };

    useEffect(() => {
        if (isSuccess || isError) {
            setTimeout(() => {
                router.push('/login');
            }, 1500);
        }
    }, [isSuccess, isError]);


    return (
        <>
            <ToastContainer />
            <div className="loginwrapper">
                <div className="lg-inner-column">

                    <div className="right-column relative">
                        <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
                            <div className="auth-box h-full flex flex-col justify-center">
                                <div className="text-center 2xl:mb-10 mb-4">
                                    <Link href="/">
                                        <img
                                            src={Logo}
                                            className="py-5 px-5"
                                            alt="AIM United Ltd Logo"
                                        />
                                    </Link>
                                    <div className="text-slate-500 text-base">
                                        Activate your account to start using AIM Products
                                    </div>
                                </div>

                                <Button
                                    icon="solar:verified-check-outline"
                                    text="Activate"
                                    className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                                    iconClass=" text-lg"
                                    onClick={onSubmit}
                                    isLoading={isLoading} disabled={isLoading}
                                />
                            </div>
                            <div className="auth-footer text-center">
                                {<Copyright />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default activation;
