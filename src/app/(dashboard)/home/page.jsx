"use client";
import React, { useEffect } from "react";
import Card from "@/components/ui/Card";
import { useSelector, useDispatch } from "react-redux";
import Loading from "@/components/Loading";
import { useGetAccountQuery } from "@/services/accounts";
import { Greeting } from "./Greeting";

const Home = () => {
  const { data: me } = useGetAccountQuery();

  return (
    <div className="grid grid-cols-12 gap-5 mb-5">
      <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
      <Greeting displayName={me?.data?.displayName}/>
      </div>
      {/* <div className="2xl:col-span-9 lg:col-span-8 col-span-12">
            <Card bodyClass="p-4">
              <div className="grid md:grid-cols-3 col-span-1 gap-4">
                <GroupChart1 me={me} />
              </div>
            </Card>
          </div> */}
    </div>
  );
};

export default Home;