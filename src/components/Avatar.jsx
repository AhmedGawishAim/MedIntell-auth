import AvatarGroup from "@atlaskit/avatar-group";
import React from "react";
import { useGetAccountQuery } from "@/services/accounts";
import { useRouter } from "next/navigation";

const Avatar = ({ size, data, showName = false }) => {
  const { data: me } = useGetAccountQuery();
  
  const router = useRouter();

  const _data = data.map((user, userIndex) => ({
    id: user?.id,
    name: user?.full_name,
    src: user?.avatar,
    onClick: () =>
      router.push(me?.id === user?.id ? "/profile" : `/users/${user?.id}`),
  }));

  return (
    <div
      className="flex space-x-3 items-center text-left rtl:space-x-reverse"
    >
      <div className="flex-none">

        <AvatarGroup appearance="stack" size={size} data={_data} onAvatarClick={(event, clickedAvatar) => {
          if (clickedAvatar?.onClick) {
            clickedAvatar.onClick();
          }
        }} />
      </div>
      <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
        {showName && (<span onClick={() => router.push(me?.id === _data[0]?.id ? "/profile" : `/users/${_data[0]?.id}`)} className="inline space-x-2">{_data[0]?.name}</span>)}
      </div>
    </div>
  );
};

export default Avatar;
