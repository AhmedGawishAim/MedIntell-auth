"use client";

import React from "react";
import Image from "next/image";

// import images (SVGs as files, not inline components)
import Twitter from "@/assets/images/icon/tw.svg";
import FaceBook from "@/assets/images/icon/fb.svg";
import LinkedIn from "@/assets/images/icon/in.svg";
import Google from "@/assets/images/icon/gp.svg";

const Social = () => {
  return (
    <ul className="flex gap-2">
      <li>
        <a
          href="#"
          className="inline-flex h-10 w-10 bg-[#1C9CEB] rounded-full items-center justify-center"
        >
          <Image src={Twitter} alt="Twitter" width={20} height={20} />
        </a>
      </li>
      <li>
        <a
          href="#"
          className="inline-flex h-10 w-10 bg-[#395599] rounded-full items-center justify-center"
        >
          <Image src={FaceBook} alt="Facebook" width={20} height={20} />
        </a>
      </li>
      <li>
        <a
          href="#"
          className="inline-flex h-10 w-10 bg-[#0A63BC] rounded-full items-center justify-center"
        >
          <Image src={LinkedIn} alt="LinkedIn" width={20} height={20} />
        </a>
      </li>
      <li>
        <a
          href="#"
          className="inline-flex h-10 w-10 bg-[#EA4335] rounded-full items-center justify-center"
        >
          <Image src={Google} alt="Google" width={20} height={20} />
        </a>
      </li>
    </ul>
  );
};

export default Social;
