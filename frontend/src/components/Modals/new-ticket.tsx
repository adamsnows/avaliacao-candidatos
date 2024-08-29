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
import { useSession } from "next-auth/react";
import { useModal } from "@/contexts/modal-context";
import { useTickets } from "@/contexts/ticket-context";
import toast from "react-hot-toast";

const contactOptions = [
  { value: "true", title: "Sim", description: "O cliente entrou em contato" },
  { value: "false", title: "Não", description: "Contato será feito" },
];

const selectOptions = [
  { label: "Tipo de contato 1", value: "contact-1" },
  { label: "Tipo de contato 2", value: "contact-2" },
  { label: "Tipo de contato 3", value: "contact-3" },
];

const vehicleOptions = [
  { label: "Carro", value: "Carro" },
  { label: "Moto", value: "Moto" },
  { label: "Bicicleta", value: "Bicicleta" },
];

const reasonOptions = [
  { label: "Motivo 1", value: "REASON_1" },
  { label: "Motivo 2", value: "REASON_2" },
  { label: "Motivo 3", value: "REASON_3" },
];

const statusOptions = [
  { label: "Pendente", value: "PENDING" },
  { label: "Em Andamento", value: "IN_PROGRESS" },
  { label: "Resolvido", value: "RESOLVED" },
  { label: "Fechado", value: "CLOSED" },
];

const NewTicketModal = () => {
  const { data: session } = useSession();
  const { closeModal } = useModal();
  const { addTicket } = useTickets();
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatus] = useState("PENDING");
  const [contact, setContact] = useState("false");
  const [contactType, setContactType] = useState({
    label: "Tipo de contato 1",
    value: "contact-1",
  });
  const [intention, setIntention] = useState("");
  const [vehicles, setVehicles] = useState<string[]>([]);
  const [reason, setReason] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleStatusChange = (selectedOption) => {
    setStatus(selectedOption.value);
  };

  const handleNext = async () => {
    if (activeIndex < 3) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    } else {
      try {
        const newTicket = {
          status,
          userId: session?.user?.id,
          contact: contact === "true",
          contactType: contactType.value,
          intention,
          vehicles,
          reason,
          additionalInfo,
        };

        await addTicket(newTicket);
        window.location.reload();
        closeModal();
      } catch (error) {
        toast.error("Erro ao criar o ticket");
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
          <Tab.ListItem>STATUS</Tab.ListItem>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="flex flex-col gap-4">
            <span className="text-gray-900 my-4 block">
              Houve contato passivo?
            </span>
            <RadioGroup
              value={contact}
              setValue={setContact}
              className="grid sm:grid-cols-2 max-w-2xl gap-4"
            >
              {contactOptions.map((item) => (
                <AdvancedRadio
                  key={item.value}
                  name="contact"
                  value={item.value}
                  inputClassName={`[&:checked~span_.icon]:block ${
                    contact === item.value ? "bg-primary/50" : ""
                  }`}
                >
                  <span className="flex justify-between items-center">
                    <Text
                      className={`font-semibold ${
                        contact === item.value ? "text-primary" : ""
                      }`}
                    >
                      {item.title}
                    </Text>
                  </span>
                  <Text
                    className={`text-sm font-light ${
                      contact === item.value ? "text-primary" : "text-gray-400"
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
              <Radio label="Operacional" value="OPERATIONAL" />
              <Radio label="Relacionamento" value="RELATIONSHIP" />
              <Radio label="Suporte" value="SUPPORT" />
              <Radio label="Vendas" value="SELLING" />
            </RadioGroup>
            <MultiSelect
              className="mt-4"
              placeholder="Veículo(s)"
              options={vehicleOptions}
              value={vehicles}
              onChange={(values) => setVehicles(values as string[])}
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
              value={reason}
              setValue={setReason}
              className="flex flex-col mt-4 gap-4 text-gray-700 font-light bg-gray-100 p-4"
            >
              {reasonOptions.map((item) => (
                <Radio key={item.value} label={item.label} value={item.value} />
              ))}
            </RadioGroup>

            <div className="flex gap-2 flex-col my-4">
              <div className="flex gap-2 items-center">
                <span className="text-primary">Prazo estimado: 06/04/2024</span>
                <CiCircleInfo className="text-lg" />
              </div>
              <span className="text-xs">
                Informe o cliente que a resolução deste motivo está prevista em{" "}
                {`{3 dias úteis}`}
              </span>
            </div>
            <Textarea
              placeholder="Informe mais detalhes sobre o ticket"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </Tab.Panel>
          <Tab.Panel>
            <div className="my-4 flex flex-col gap-1">
              <span className="text-gray-900">Qual o status desse ticket?</span>
              <span className="text-gray-500 text-sm">Sub título</span>
            </div>
            <Select
              placeholder="Selecione o status"
              options={statusOptions}
              value={statusOptions.find((option) => option.value === status)}
              onChange={handleStatusChange}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab>

      <div className="flex justify-between gap-4 mt-6">
        <Button
          type="button"
          variant="outline"
          className="w-1/2"
          onClick={() => handlePrevious()}
          disabled={activeIndex === 0}
        >
          <FaArrowLeft className="w-4" />
          Voltar
        </Button>
        <Button type="button" className="w-1/2" onClick={() => handleNext()}>
          {activeIndex < 3 ? (
            <>
              Próximo
              <FaArrowRight className="w-4" />
            </>
          ) : (
            <>
              Concluir
              <MdDone className="w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default NewTicketModal;
