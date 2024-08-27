"use client";

import { Button, Input, Select } from "rizzui";
import { FaPlus } from "react-icons/fa6";
import { LuKanbanSquare } from "react-icons/lu";

import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { IoIosMenu } from "react-icons/io";
import { MdViewArray } from "react-icons/md";
import { MdViewColumn } from "react-icons/md";

import { useState } from "react";

const ToolsComponent = () => {
  const [period, setPeriod] = useState<string | null>(null);
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [reason, setReason] = useState<string | null>(null);
  const [client, setClient] = useState<string | null>(null);
  const [vehicle, setVehicle] = useState<string | null>(null);

  const periodOptions = [
    { label: "Hoje", value: "today" },
    { label: "Ontem", value: "yesterday" },
    { label: "Antes de ontem", value: "two-days-ago" },
  ];

  const orderByOptions = [
    { label: "Data de abertura", value: "today" },
    { label: "Ontem", value: "yesterday" },
    { label: "Antes de ontem", value: "two-days-ago" },
  ];

  const removeFilters = () => {
    setPeriod(null);
    setOrderBy(null);
    setStatus(null);
    setType(null);
    setReason(null);
    setClient(null);
    setVehicle(null);
  };

  const getTextColor = (value: string | null) => {
    return value ? "text-primary" : "text-gray-600";
  };

  return (
    <div className="mt-6 flex gap-4 items-center h-[30px]">
      <Button className="bg-primary flex gap-4 px-4">
        Abrir ticket <FaPlus />
      </Button>

      <Input
        suffix={<MagnifyingGlassIcon className="w-4" />}
        placeholder="Pesquisar"
        className="w-[273px]"
      />

      <Select
        options={periodOptions}
        value={period}
        onChange={setPeriod}
        label="Período"
        labelClassName="mt-1"
        placeholder=""
        selectClassName={`border-none outline-none hover:outline-none hover:ring-0 hover:border-none ring-0 focus:ring-0 w-[100px]`}
        className={` ${getTextColor(
          period
        )} flex  items-center border-none max-w-[130px]`}
      />

      <Select
        options={orderByOptions}
        value={orderBy}
        onChange={setOrderBy}
        label="Ordenado por"
        labelClassName="mt-1"
        placeholder=""
        selectClassName={`border-none outline-none hover:outline-none hover:ring-0 hover:border-none ring-0 focus:ring-0 w-[120px]`}
        className={` ${getTextColor(
          orderBy
        )} max-w-[220px] flex gap-0 items-center border-none`}
      />

      <Select
        options={periodOptions}
        value={status}
        onChange={setStatus}
        label="Status"
        labelClassName="mt-1"
        placeholder=""
        selectClassName={`border-none outline-none hover:outline-none hover:ring-0 hover:border-none ring-0 focus:ring-0 }`}
        className={` ${getTextColor(
          status
        )} max-w-[130px] flex gap-0 items-center border-none`}
      />

      <Select
        options={periodOptions}
        value={type}
        onChange={setType}
        label="Tipo"
        labelClassName="mt-1"
        placeholder=""
        selectClassName={`border-none outline-none hover:outline-none hover:ring-0 hover:border-none ring-0 focus:ring-0 }`}
        className={`${getTextColor(
          type
        )} w-[130px] flex gap-0 items-center border-none`}
      />

      <Select
        options={periodOptions}
        value={reason}
        onChange={setReason}
        label="Motivo"
        labelClassName="mt-1"
        placeholder=""
        selectClassName={`border-none outline-none hover:outline-none hover:ring-0 hover:border-none ring-0 focus:ring-0 }`}
        className={`${getTextColor(
          reason
        )} max-w-[130px] flex gap-0 items-center border-none`}
      />

      <Select
        options={periodOptions}
        value={client}
        onChange={setClient}
        label="Cliente"
        labelClassName="mt-1"
        placeholder=""
        searchContainerClassName="w-[200px]"
        selectClassName={`border-none outline-none hover:outline-none hover:ring-0 hover:border-none ring-0 focus:ring-0 }`}
        className={` ${getTextColor(
          client
        )} max-w-[130px] flex gap-0 items-center border-none`}
      />

      <Select
        options={periodOptions}
        value={vehicle}
        onChange={setVehicle}
        label="Veículo"
        labelClassName="mt-1"
        placeholder=""
        selectClassName={`border-none outline-none hover:outline-none hover:ring-0 hover:border-none ring-0 focus:ring-0 }`}
        className={` ${getTextColor(
          vehicle
        )} max-w-[130px] flex gap-0 items-center border-none`}
      />

      <div className="border-l h-full border-gray-300" />
      <span
        className="text-xs text-gray-600 font-light cursor-pointer text-nowrap"
        onClick={removeFilters}
      >
        Remover filtros
      </span>
      <div className="ms-auto flex gap-3">
        <IoIosMenu className="cursor-pointer text-primary" />
        <LuKanbanSquare className="cursor-pointer" />
        <MdViewArray className="cursor-pointer" />
        <MdViewColumn className="cursor-pointer" />
      </div>
    </div>
  );
};

export default ToolsComponent;
