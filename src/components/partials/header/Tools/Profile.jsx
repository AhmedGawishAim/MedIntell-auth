"use client";

import React from "react";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import { Menu } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useGetAccountQuery, useLogOutMutation } from "@/services/accounts";
import Avatar from "@/components/Avatar";

const profileLabel = () => {
  const { data: me } = useGetAccountQuery();

  return (
    <div className="flex items-center">
      <div className="flex-1 ltr:mr-[10px] rtl:ml-[10px]">
        <div className="lg:h-8 lg:w-8 ">
          <Avatar data={[me]} size={"medium"} />
        </div>
      </div>
      <div className="flex-none text-slate-600 dark:text-white text-sm font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap w-[85px] block">
          {me?.full_name}
        </span>
        <span className="text-base inline-block ltr:ml-[10px] rtl:mr-[10px]">
          <Icon icon="heroicons-outline:chevron-down"></Icon>
        </span>
      </div>
    </div>
  );
};

const Profile = () => {
  const [logOut] = useLogOutMutation();
  const router = useRouter();

  const ProfileMenu = [
    {
      label: "Profile",
      icon: "heroicons-outline:user",
      action: () => {
        router.push("/profile");
      },
    },
    {
      label: "Settings",
      icon: "heroicons-outline:cog",
      action: () => {
        router.push("/settings");
      },
    },
    {
      label: "Price",
      icon: "heroicons-outline:credit-card",
      action: () => {
        router.push("/price");
      },
    },
    {
      label: "Faq",
      icon: "heroicons-outline:information-circle",
      action: () => {
        router.push("/faq");
      },
    },
    {
      label: "Logout",
      icon: "heroicons-outline:login",
      action: () => {
        logOut()
        .unwrap()
        .then(() => {
          setTimeout(() => {
            router.push("/");
          }, 1500);
        })
      },
    },
  ];

  return (
    <Dropdown label={profileLabel()} classMenuItems="w-[180px] top-[58px]">
      {ProfileMenu.map((item, index) => (
        <Menu.Item key={index}>
          {({ active }) => (
            <div
              onClick={() => item.action()}
              className={`${
                active
                  ? "bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-300 dark:bg-opacity-50"
                  : "text-slate-600 dark:text-slate-300"
              } block ${
                item.hasDivider
                  ? "border-t border-slate-100 dark:border-slate-700"
                  : ""
              }`}
            >
              <div className="block cursor-pointer px-4 py-2">
                <div className="flex items-center">
                  <span className="block text-xl ltr:mr-3 rtl:ml-3">
                    <Icon icon={item.icon} />
                  </span>
                  <span className="block text-sm">{item.label}</span>
                </div>
              </div>
            </div>
          )}
        </Menu.Item>
      ))}
    </Dropdown>
  );
};

export default Profile;
