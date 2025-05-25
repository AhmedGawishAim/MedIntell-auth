
"use client";
import Layout from "@/layout/Layout";

import { Provider } from "react-redux";
import store from "@/store/index";
import { useEffect, useState } from "react";

export function StoreProvider({ children }) {

     return (
        <Provider  store={store}>
          {/* <Layout> */}
            {children}
            {/* <Home>
              {children}
            </Home> */}
          {/* </Layout> */}
        </Provider>
    );
}



