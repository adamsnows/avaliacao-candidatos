/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { SlRefresh } from "react-icons/sl";
import { FaRegBuilding } from "react-icons/fa";
import { BsMoon } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { signOut } from "next-auth/react";
import { Button } from "rizzui";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="h-[72px] bg-primary flex items-center px-9 justify-between">
      <img src="/icons/logo.png" alt="logo" className="cursor-pointer" />
      <span className="text-white">Atendimento ao cliente</span>
      <div className="flex gap-4 text-gray-300 h-[32px]">
        <SlRefresh className="my-auto h-[20px] w-[20px] cursor-pointer" />
        <div className="border-r border-white" />
        <FaRegBuilding className="my-auto h-[20px] w-[20px] cursor-pointer" />
        <BsMoon className="my-auto h-[20px] w-[20px] cursor-pointer" />
        <IoPersonOutline
          className="my-auto h-[20px] w-[20px] cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirmar Logout</h2>
            <p className="mb-4 text-sm text-gray-500">
              Você realmente deseja deslogar?
            </p>
            <div className="flex gap-4 w-full">
              <Button
                className="bg-blue-500 text-white w-full"
                onClick={handleSignOut}
              >
                Sim
              </Button>
              <Button
                className="bg-gray-300 text-gray-800 w-full"
                onClick={() => setIsModalOpen(false)}
              >
                Não
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
