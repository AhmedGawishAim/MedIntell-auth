"use client";
import React from "react";
import useDarkMode from "@/hooks/useDarkMode";
import  Link  from "next/link";
import ForgotPasswordConfirmForm from "@/app/(auth)/_common/ForgotPasswordConfirmForm";
import LogoWhite from "@/assets/images/logo/logo-c-white.svg";
import Logo from "@/assets/images/logo/logo.svg";
import Copyright from "@/components/ui/Copyright";
import Image from "next/image";

import "@/assets/scss/app.css"
const ForgotPasswordConfirm = () => {
  const [isDark] = useDarkMode();

  return (
    <>      
    <div
        className="loginwrapper bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${LogoWhite.src})`,
        }}
      >
        <div className="lg-inner-column">
          <div className="left-columns lg:w-1/2 lg:block hidden">
            <div className="logo-box-3">
              <Link href="/login" className="">
                <Image
                  src={isDark ? LogoWhite : Logo}
                  alt="Logo"
                  className="mx-auto"
                  width={120}
                  height={40}
                  priority
                />
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 w-full flex flex-col items-center justify-center">
            <div className="auth-box-3">
              <div className="mobile-logo text-center mb-6 lg:hidden block">
                <Link href="/login">
                  <Image
                    src={isDark ? LogoWhite : Logo}
                    alt="Logo"
                    className="mx-auto"
                    width={120}
                    height={40}
                    priority
                  />
                </Link>
              </div>
              <div className="text-center 2xl:mb-10 mb-5">
                <h4 className="font-medium mb-4">Password Reset Confirm</h4>
                <div className="text-slate-500 dark:text-slate-400 text-base">
                  Reset Password with MEDintell.
                </div>
              </div>
              <div className="font-normal text-base text-slate-500 dark:text-slate-400 text-center px-2 bg-slate-100 dark:bg-slate-600 rounded py-3 mb-4 mt-10">
                Please enter your password, then confirm it.
              </div>

              <ForgotPasswordConfirmForm />
              <div className="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-8 uppercase text-sm">
                <Link
                  href="/login"
                  className="text-slate-900 dark:text-white font-medium hover:underline"
                >
                  Send me Back
                </Link>
                <span> To The Sign In</span>
              </div>
            </div>
          </div>
          <div className="auth-footer3  py-5 px-5 text-xl w-full">
            <Copyright />
          </div>
        </div>
      </div>
    </>
  );
};
export default ForgotPasswordConfirm;
