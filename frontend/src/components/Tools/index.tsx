"use client";

import { Button, Input, Select, Tab } from "rizzui";
import { FaPlus } from "react-icons/fa6";
import { LuKanbanSquare } from "react-icons/lu";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { IoIosMenu } from "react-icons/io";
import { MdViewArray, MdViewColumn } from "react-icons/md"; // Corrigido

import { useState } from "react";
import { useModal } from "@/contexts/modal-context";
import NewTicketModal from "../Modals/new-ticket";
import { useTickets } from "@/contexts/ticket-context";

const ToolsComponent = () => {
  const [filters, setFilters] = useState({
    period: null,
    orderBy: null,
    status: null,
    type: null,
    reason: null,
    client: null,
    vehicle: null,
  });

  const { openModal } = useModal();
  const { addTicket } = useTickets();

  const handleOpenModal = () => {
    openModal(<NewTicketModal onSave={addTicket} />);
  };

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
    setFilters({
      period: null,
      orderBy: null,
      status: null,
      type: null,
      reason: null,
      client: null,
      vehicle: null,
    });
  };

  const getTextColor = (value) => (value ? "text-primary" : "text-gray-600");

  return (
    <div className="mt-6 flex gap-4 items-center h-[30px]">
      <Button
        className="bg-primary flex gap-4 px-4 text-nowrap"
        onClick={handleOpenModal}
      >
        Abrir ticket <FaPlus />
      </Button>

      <Input
        suffix={<MagnifyingGlassIcon className="w-4" />}
        placeholder="Pesquisar"
        className="w-[273px]"
      />

      <Select
        options={periodOptions}
        value={filters.period}
        onChange={(value) => setFilters((prev) => ({ ...prev, period: value }))}
        label="Período"
        labelClassName="mt-1"
        placeholder=""
        selectClassName={`border-none outline-none hover:outline-none hover:ring-0 hover:border-none ring-0 focus:ring-0 w-[100px]`}
        className={`${getTextColor(
          filters.period
        )} flex items-center border-none max-w-[130px]`}
      />

      <Select
        options={orderByOptions}
        value={filters.orderBy}
        onChange={(value) =>
          setFilters((prev) => ({ ...prev, orderBy: value }))
        }
        label="Ordenado por"
        labelClassName="mt-1"
        placeholder=""
        selectClassName={`border-none outline-none hover:outline-none hover:ring-0 hover:border-none ring-0 focus:ring-0 w-[120px]`}
        className={`${getTextColor(
          filters.orderBy
        )} ms-4 max-w-[220px] flex gap-0 items-center border-none`}
      />

      <Select
        options={periodOptions}
        value={filters.status}
        onChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
        label="Status"
        labelClassName="mt-1"
        placeholder=""
        selectClassName={`border-none outline-none hover:outline-none hover:ring-0 hover:border-none ring-0 focus:ring-0`}
        className={`${getTextColor(
          filters.status
        )} max-w-[130px] flex gap-0 items-center border-none`}
      />

      <Select
        options={periodOptions}
        value={filters.type}
        onChange={(value) => setFilters((prev) => ({ ...prev, type: value }))}
        label="Tipo"
        labelClassName="mt-1"
        placeholder=""
        selectClassName={`border-none outline-none hover:outline-none hover:ring-0 hover:border-none ring-0 focus:ring-0`}
        className={`${getTextColor(
          filters.type
        )} w-[130px] flex gap-0 items-center border-none`}
      />

      <Select
        options={periodOptions}
        value={filters.reason}
        onChange={(value) => setFilters((prev) => ({ ...prev, reason: value }))}
        label="Motivo"
        labelClassName="mt-1"
        placeholder=""
        selectClassName={`border-none outline-none hover:outline-none hover:ring-0 hover:border-none ring-0 focus:ring-0`}
        className={`${getTextColor(
          filters.reason
        )} max-w-[130px] flex gap-0 items-center border-none`}
      />

      <Select
        options={periodOptions}
        value={filters.client}
        onChange={(value) => setFilters((prev) => ({ ...prev, client: value }))}
        label="Cliente"
        labelClassName="mt-1"
        placeholder=""
        searchContainerClassName="w-[200px]"
        selectClassName={`border-none outline-none hover:outline-none hover:ring-0 hover:border-none ring-0 focus:ring-0`}
        className={`${getTextColor(
          filters.client
        )} max-w-[130px] flex gap-0 items-center border-none`}
      />

      <Select
        options={periodOptions}
        value={filters.vehicle}
        onChange={(value) =>
          setFilters((prev) => ({ ...prev, vehicle: value }))
        }
        label="Veículo"
        labelClassName="mt-1"
        placeholder=""
        selectClassName={`border-none outline-none hover:outline-none hover:ring-0 hover:border-none ring-0 focus:ring-0`}
        className={`${getTextColor(
          filters.vehicle
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
