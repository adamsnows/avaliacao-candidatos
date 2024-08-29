import { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useModal } from "@/contexts/modal-context";
import {
  Button,
  Input,
  MultiSelect,
  Radio,
  Select,
  Tab,
  Textarea,
} from "rizzui";
import { AdvancedRadio, RadioGroup, Text } from "rizzui";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { MdDone } from "react-icons/md";
import api from "@/app/api/axios/api";

const options = [
  { value: "yes", title: "Sim", description: "O cliente entrou em contato" },
  { value: "no", title: "Não", description: "Contato será feito" },
];

const selectOptions = [
  { label: "Tipo de contato 1", value: "contact-1" },
  { label: "Tipo de contato 2", value: "contact-2" },
  { label: "Tipo de contato 3", value: "contact-3" },
];

const vehicleOptions = [
  { label: "Veículo 1", value: "Carro" },
  { label: "Veículo 2", value: "Moto" },
  { label: "Veículo 3", value: "Bicicleta" },
];

const reasonOptions = [
  { label: "Motivo 1", value: "REASON_1" },
  { label: "Motivo 2", value: "REASON_2" },
  { label: "Motivo 3", value: "REASON_3" },
];

const NewTicketModal = () => {
  const { data: session } = useSession();
  const { closeModal } = useModal();
  const [activeIndex, setActiveIndex] = useState(0);
  const [contactValue, setContactValue] = useState("yes");
  const [contactType, setContactType] = useState({
    label: "Tipo de contato",
    value: "",
  });
  const [intention, setIntention] = useState("operational");
  const [reason, setReason] = useState("");
  const [vehicle, setVehicle] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const validateAndProceed = async () => {
    let valid = true;

    if (!contactValue) {
      toast.error("Selecione se houve contato.");
      valid = false;
    }
    if (!contactType) {
      toast.error("Selecione o tipo de contato.");
      valid = false;
    }
    if (!intention) {
      toast.error("Selecione o intuito do ticket.");
      valid = false;
    }
    if (vehicle.length === 0) {
      toast.error("Selecione pelo menos um veículo.");
      valid = false;
    }
    if (!reason) {
      toast.error("Selecione o motivo do ticket.");
      valid = false;
    }
    if (valid) {
      await createTicket();
    }
  };

  const createTicket = async () => {
    try {
      await api.post("/tickets/", {
        status: "PENDING",
        userId: session.user.id,
        contact: contactValue === "yes",
        contactType: contactType.value,
        intention,
        vehicles: vehicle,
        reason,
        additionalInfo,
      });

      toast.success("Ticket criado com sucesso!");
      window.location.reload();
    } catch (error) {
      toast.error("Erro ao criar o ticket. Tente novamente.");
      console.error("Erro ao criar o ticket:", error);
    }
  };

  const handleNext = () => {
    if (activeIndex < 2) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    } else {
      validateAndProceed();
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
              <Radio label="Operacional" value="OPERATIONAL" />
              <Radio label="Relacionamento" value="RELATIONSHIP" />
              <Radio label="Suporte" value="SUPPORT" />
              <Radio label="Vendas" value="SELLING" />
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
              value={reason}
              onChange={(e) => setReason(e.target.value)}
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

            <div className="flex gap-2 flex-col my-4 ">
              <div className="flex gap-2 items-center ">
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
        </Tab.Panels>
      </Tab>

      <div className="flex justify-between">
        {activeIndex > 0 && (
          <Button
            variant="outline"
            className="mt-4 w-28"
            onClick={handlePrevious}
          >
            <FaArrowLeft />
            <span className="ml-2">Anterior</span>
          </Button>
        )}
        <Button className="mt-4 w-28" onClick={handleNext}>
          {activeIndex < 2 ? (
            <>
              <span className="mr-2">Próximo</span>
              <FaArrowRight />
            </>
          ) : (
            <>
              <span className="mr-2">Salvar</span>
              <MdDone />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default NewTicketModal;
