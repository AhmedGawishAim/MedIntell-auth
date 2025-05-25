"use client";
import React, { Suspense, Fragment, useRef, useEffect, useState } from "react";
import Header from "@/components/partials/header";
import Sidebar from "@/components/partials/sidebar";
import Settings from "@/components/partials/settings";
import useWidth from "@/hooks/useWidth";
import useSidebar from "@/hooks/useSidebar";
import useContentWidth from "@/hooks/useContentWidth";
import useMenulayout from "@/hooks/useMenulayout";
import useMenuHidden from "@/hooks/useMenuHidden";
import Footer from "@/components/partials/footer";
import MobileMenu from "../components/partials/sidebar/MobileMenu";
import useMobileMenu from "@/hooks/useMobileMenu";
import MobileFooter from "@/components/partials/footer/MobileFooter";
import { ToastContainer } from "react-toastify";
import Loading from "@/components/Loading";
import "@/assets/scss/app.scss"
const Layout = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const { width, breakpoints } = useWidth();
  const [collapsed] = useSidebar();
  const [contentWidth] = useContentWidth();
  const [menuType] = useMenulayout();
  const [menuHidden] = useMenuHidden();
  const [mobileMenu, setMobileMenu] = useMobileMenu();
  const nodeRef = useRef(null);

  // Ensure this runs only on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const switchHeaderClass = () => {
    if (menuType === "horizontal" || menuHidden) {
      return "ltr:ml-0 rtl:mr-0";
    } else if (collapsed) {
      return "ltr:ml-[72px] rtl:mr-[72px]";
    } else {
      return "ltr:ml-[248px] rtl:mr-[248px]";
    }
  };

  // Don't render anything on server
  if (!isClient) return null;

  return (
    <>
      {/* <ToastContainer /> */}
      <Header className={width > breakpoints.xl ? switchHeaderClass() : ""} />
      
      {/* Sidebar/Mobile Menu */}
      {menuType === "vertical" && width > breakpoints.xl && !menuHidden && (
        <Sidebar />
      )}
      {width < breakpoints.xl && mobileMenu && <MobileMenu />}
      
      {/* Mobile menu overlay */}
      {width < breakpoints.xl && mobileMenu && (
        <div
          className="overlay bg-slate-900/50 backdrop-filter backdrop-blur-sm opacity-100 fixed inset-0 z-[999]"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <Settings />
      
      {/* Main content */}
      <div
        className={`content-wrapper transition-all duration-150 ${
          width > 1280 ? switchHeaderClass() : ""
        }`}
      >
        <div className="page-content md:p-6 p-[15px] page-min-height">
          <div
            className={
              contentWidth === "boxed" ? "container mx-auto" : "container-fluid"
            }
          >
            <Suspense fallback={<Loading />}>
              <Fragment>{children}</Fragment>
            </Suspense>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      {width < breakpoints.md ? (
        <MobileFooter />
      ) : (
        <Footer className={width > breakpoints.xl ? switchHeaderClass() : ""} />
      )}
    </>
  );
};

export default Layout;