"use client";

import React, { useState, useCallback } from "react";
import { SlMenu } from "react-icons/sl";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
const registerModal=useRegisterModal()
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className=" flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="
        hidden
        md:block
        text-sm
        font-semibold
        py-3
        px-4
        rounded-full
        transition
        cursor-pointer
        
        "
        >
          Airbnb your Home
        </div>
        <div
          onClick={() => toggleOpen()}
          className="
        p-4
        md:py-1
        md:px-2
        border-[1px]
        border-neutral-200
        flex
        flex-row
        items-center
        gap-3
        rounded-full
        cursor-pointer
        hover:shadow-md
        transition
        "
        >
          <SlMenu />
          <div
            className="
            hidden md:block
            "
          >
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute
        rounded-xl
        shadow-md
        w-[40vw]
        md:w-3/4
        bg-white
        overflow-hidden
        right-0
        top-12
        text-sm
        "
        >
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem onClick={() => {}} label="Login" />
              <MenuItem onClick={registerModal.onOpen} label="Signup" />
            </>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
