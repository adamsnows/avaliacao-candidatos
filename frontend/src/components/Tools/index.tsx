"use client";

import { Button, Input, Select } from "rizzui";
import { FaPlus } from "react-icons/fa6";
import { ArrowRightIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

const ToolsComponent = () => {
  const [value, setValue] = useState(null);
  const options = [
    { label: "Hoje ", value: "apple" },
    { label: "Ontem ", value: "banana" },
    { label: "Antes de ontem ", value: "cherry" },
  ];

  return (
    <div className="mt-6 flex gap-4 items-center">
      <Button className="bg-primary flex gap-4 px-4">
        Abrir ticket <FaPlus />
      </Button>

      <Input
        suffix={<MagnifyingGlassIcon className="w-4" />}
        placeholder="Pesquisar"
        className="w-[273px]"
      />
      <Select
        options={options}
        value={value}
        onChange={setValue}
        label="Período"
        labelClassName="mt-1"
        placeholder=""
        optionClassName=""
        selectClassName="border-none outline-none hover:outline-none hover:ring-0 hover:border-none ring-0 focus:ring-0"
        className="w-[140px] flex gap-0 items-center border-none text-primary"
      />
      <Select
        options={options}
        value={value}
        onChange={setValue}
        label="Ordenado por"
        labelClassName="mt-1"
        placeholder=""
        selectClassName="border-none outline-none hover:outline-none hover:ring-0 hover:border-none ring-0 focus:ring-0"
        className="max-w-[180px] flex gap-0 items-center border-none text-primary"
      />

      <Select
        options={options}
        value={value}
        onChange={setValue}
        label="Status"
        labelClassName="mt-1"
        placeholder=""
        selectClassName="border-none outline-none hover:outline-none hover:ring-0 hover:border-none ring-0 focus:ring-0"
        className="max-w-[245px] flex gap-0 items-center border-none text-primary"
      />
    </div>
  );
};

export default ToolsComponent;
