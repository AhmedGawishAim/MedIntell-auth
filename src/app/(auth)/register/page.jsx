"use client";
// import "@/assets/scss/app.css"
import React from "react";
import Link from "next/link";
import RegForm from "@/app/(auth)/_common/RegisterForm";
import Social from "@/app/(auth)/_common/SocialIconComp";
import useDarkmode from "@/hooks/useDarkMode";
import Image from 'next/image';
import Copyright from "@/components/ui/Copyright";
import { ToastContainer } from "react-toastify";

// image import
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import Logo from "@/assets/images/logo/logo.svg";
import bgImage from "@/assets/images/all-img/login-bg.png";

const register2 = () => {
  const [isDark] = useDarkmode();
  return (
    <>
    <ToastContainer />
      <div className="loginwrapper">
        <div className="lg-inner-column">
          <div className="right-column relative">
            <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
              <div className="auth-box h-full flex flex-col justify-center">
                <div className="mobile-logo text-center mb-6 lg:hidden block">
                  <Link href="/">
                    <Image
                      src={isDark ? LogoWhite : Logo}
                      alt=""
                      width={200}
                      height={120}
                      className="mx-auto"
                    />
                  </Link>
                </div>
                <div className="text-center 2xl:mb-10 mb-5">
                  <h4 className="font-medium">Sign up</h4>
                  <div className="text-slate-500 dark:text-slate-400 text-base">
                    Create an account to start using MEDintell
                  </div>
                </div>
                <RegForm />
                <div className=" relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6">
                  <div className=" absolute inline-block  bg-white dark:bg-slate-800 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm  text-slate-500  dark:text-slate-400font-normal ">
                    Or continue with
                  </div>
                </div>
                <div className="max-w-[242px] mx-auto mt-8 w-full">
                  <Social />
                </div>
                <div className="max-w-[215px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-6 uppercase text-sm">
                  Already registered?
                  <Link
                    href="/login"
                    className="text-slate-900 dark:text-white font-medium hover:underline"
                  >
                    {" "}Sign In
                  </Link>
                </div>
              </div>
              <div id="copyright" className="auth-box text-black py-5 px-5 text-xl w-full">
                  {<Copyright />}
              </div>
            </div>
          </div>
          <div
            className="left-column bg-cover bg-no-repeat bg-center"
            style={{
                 backgroundImage: `url(${bgImage.src})`
              }}
          >
            <div className="flex flex-col h-full justify-center">
              <div className="flex-1 flex flex-col justify-center items-center">
                <Link href="/">
                 <Image
                      src={isDark ? LogoWhite : Logo}
                      alt=""
                      width={200}
                      height={120}
                      className="mx-auto w-full h-full"
                    /> 
                </Link>
              </div>
              <div>
                <div className="black-500-title max-w-[525px] mx-auto pb-20 text-center">
                  Unlock your Healthcare
                  <span className="text-white font-bold">{" "}Analytics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default register2;
