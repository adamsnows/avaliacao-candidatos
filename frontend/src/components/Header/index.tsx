/* eslint-disable @next/next/no-img-element */
import { SlRefresh } from "react-icons/sl";
import { FaRegBuilding } from "react-icons/fa";
import { BsMoon } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";

const Header = () => {
  return (
    <div className="h-[72px] bg-primary flex items-center px-9 justify-between">
      <img src="/icons/logo.png" alt="logo" className="cursor-pointer" />
      <span className="text-white">Atendimento ao cliente</span>
      <div className="flex gap-4 text-gray-300 h-[32px]">
        <SlRefresh className="my-auto h-[20px] w-[20px] cursor-pointer" />
        <div className="border-r border-white" />
        <FaRegBuilding className="my-auto h-[20px] w-[20px] cursor-pointer" />
        <BsMoon className="my-auto h-[20px] w-[20px] cursor-pointer" />
        <IoPersonOutline className="my-auto h-[20px] w-[20px] cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
