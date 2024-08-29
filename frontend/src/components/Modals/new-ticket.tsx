"use client";

import {
  Button,
  Input,
  MultiSelect,
  Radio,
  Select,
  Tab,
  Textarea,
} from "rizzui";
import { useState } from "react";
import { AdvancedRadio, RadioGroup, Text } from "rizzui";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { MdDone } from "react-icons/md";
import toast from "react-hot-toast";

const options = [
  {
    value: "yes",
    title: "Sim",
    description: "O cliente entrou em contato",
  },
  {
    value: "no",
    title: "Não",
    description: "Contato será feito",
  },
];

const selectOptions = [
  { label: "Tipo de contato 1", value: "contact-1" },
  { label: "Tipo de contato 2", value: "contact-2" },
  { label: "Tipo de contato 3", value: "contact-3" },
];

const vehicleOptions = [
  { label: "Veículo 1", value: "vehicle-1" },
  { label: "Veículo 2", value: "vehicle-2" },
  { label: "Veículo 3", value: "vehicle-3" },
];

const reasonOptions = [
  { label: "Motivo 1", value: "reason-1" },
  { label: "Motivo 2", value: "reason-2" },
  { label: "Motivo 3", value: "reason-3" },
];

const NewTicketModal = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [contactValue, setContactValue] = useState("yes");
  const [contactType, setContactType] = useState("");
  const [intention, setIntention] = useState("operational");
  const [reason, setReason] = useState("");
  const [vehicle, setVehicle] = useState<string[]>([]);

  const validateFields = () => {
    let valid = true;

    if (!contactValue) {
      toast.error("Campo 'Houve contato' é obrigatório.");
      valid = false;
    }

    if (!contactType) {
      toast.error("Campo 'Tipo de contato' é obrigatório.");
      valid = false;
    }

    if (!intention) {
      toast.error("Campo 'Intuito' é obrigatório.");
      valid = false;
    }

    if (activeIndex === 2 && vehicle.length === 0) {
      toast.error("Campo 'Veículo(s)' é obrigatório.");
      valid = false;
    }

    if (activeIndex === 2 && reason.length === 0) {
      toast.error("Campo 'Motivo' é obrigatório.");
      valid = false;
    }

    return valid;
  };

  const handleNext = async () => {
    if (!validateFields()) return;

    if (activeIndex < 2) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    } else {
      try {
        const updatedTicket = {
          status: status.value, // Ajuste aqui para usar apenas o valor
          userId: session?.user?.id,
          contact: contactValue === "yes",
          contactType,
          intention,
          vehicles: vehicle,
          reason,
          additionalInfo: additionalInfo,
        };

        await api.put(`/tickets/${initialData.id}`, updatedTicket);
        onUpdate(updatedTicket);
        toast.success("Ticket atualizado com sucesso");
        closeModal();
      } catch (error) {
        toast.error("Erro ao atualizar o ticket");
      }
    }
  };

  const handlePrevious = () => {
    setActiveIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <div>
      <Tab selectedIndex={activeIndex} onChange={setActiveIndex}>
        <Tab.List className="font-semibold gap-10 text-gray-500">
          <Tab.ListItem>CONTATO</Tab.ListItem>
          <Tab.ListItem>TICKET</Tab.ListItem>
          <Tab.ListItem>MOTIVO</Tab.ListItem>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="flex flex-col gap-4">
            <span className="text-gray-900 my-4 block">
              Houve contato passivo?
            </span>
            <RadioGroup
              value={contactValue}
              setValue={setContactValue}
              className="grid sm:grid-cols-2 max-w-2xl gap-4"
            >
              {options.map((item) => (
                <AdvancedRadio
                  key={item.value}
                  name="contact"
                  value={item.value}
                  inputClassName={`[&:checked~span_.icon]:block ${
                    contactValue === item.value ? "bg-primary/50" : ""
                  }`}
                >
                  <span className="flex justify-between items-center">
                    <Text
                      className={`font-semibold ${
                        contactValue === item.value ? "text-primary" : ""
                      }`}
                    >
                      {item.title}
                    </Text>
                  </span>
                  <Text
                    className={`text-sm font-light ${
                      contactValue === item.value
                        ? "text-primary"
                        : "text-gray-400"
                    }`}
                  >
                    {item.description}
                  </Text>
                </AdvancedRadio>
              ))}
            </RadioGroup>
            <Select
              placeholder="Tipo de contato"
              options={selectOptions}
              value={contactType}
              onChange={setContactType}
            />
          </Tab.Panel>
          <Tab.Panel>
            <div className="my-4 flex flex-col gap-1">
              <span className="text-gray-900">
                Qual o intuito desse ticket?
              </span>
              <span className="text-gray-500 text-sm">Sub título</span>
            </div>
            <RadioGroup
              value={intention}
              setValue={setIntention}
              className="grid grid-cols-2 gap-4 text-gray-700 font-light"
            >
              <Radio label="Operacional" value="operational" />
              <Radio label="Relacionamento" value="relationship" />
              <Radio label="Suporte" value="support" />
              <Radio label="Vendas" value="selling" />
            </RadioGroup>
            <MultiSelect
              className="mt-4"
              placeholder="Veículo(s)"
              options={vehicleOptions}
              value={vehicle}
              onChange={(values) => setVehicle(values as string[])}
            />
          </Tab.Panel>
          <Tab.Panel>
            <div className="my-4 flex flex-col gap-1">
              <span className="text-gray-900">Qual o motivo desse ticket?</span>
              <span className="text-gray-500 text-sm">Sub título</span>
            </div>
            <Input
              label="Search"
              suffix={<MagnifyingGlassIcon className="w-4" />}
              placeholder="Pesquisar"
            />
            <RadioGroup
              value={intention}
              setValue={setIntention}
              className="flex flex-col mt-4 gap-4 text-gray-700 font-light bg-gray-100 p-4"
            >
              <Radio label="Motivo 1" value="operational" />
              <Radio label="Motivo 2" value="relationship" />
              <Radio label="Motivo 3" value="support" />
              <Radio label="Motivo 4" value="selling" />
            </RadioGroup>

            <div className="flex gap-2 flex-col  my-4 ">
              <div className="flex gap-2 items-center ">
                <span className="text-primary">Prazo estimado: 06/04/2024</span>
                <CiCircleInfo className="text-lg" />
              </div>
              <span className="text-xs">
                Informe o cliente que a resolução deste motivo está prevista em{" "}
                {`{3 dias úteis}`}
              </span>
            </div>
            <Textarea placeholder="Informe mais detalhes sobre o ticket" />
          </Tab.Panel>
        </Tab.Panels>
      </Tab>

      <div className="flex justify-between">
        {activeIndex > 0 && (
          <Button
            variant="outline"
            className="mt-4 flex gap-4 border-primary text-primary"
            onClick={handlePrevious}
          >
            <FaArrowLeft />

            <span>Voltar</span>
          </Button>
        )}

        <Button className="ms-auto mt-4 flex gap-4" onClick={handleNext}>
          <span>{activeIndex < 2 ? "Avançar" : "Cadastrar"}</span>
          {activeIndex < 2 ? <FaArrowRight /> : <MdDone className="text-lg" />}
        </Button>
      </div>
    </div>
  );
};

export default NewTicketModal;
