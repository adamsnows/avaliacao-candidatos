"use client";

import BreadcrumbComponent from "@/components/Breadcrumbs";
import TicketTable from "@/components/Table";
import ToolsComponent from "@/components/Tools";
import { useEffect, useState } from "react";
import api from "@/app/api/axios/api";
import { FaHouse } from "react-icons/fa6";

const pageHeader = {
  breadcrumb: [
    {
      href: "/dashboard",
      name: <FaHouse />,
    },
    {
      name: "Atendimento ao cliente",
    },
    {
      name: "Listagem de tickets",
    },
  ],
};

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get("/tickets");
        setTickets(response.data);
      } catch (error) {
        console.error("Erro ao buscar tickets", error);
      }
    };

    fetchTickets();
  }, []);

  const handleTicketCreated = async () => {
    try {
      const response = await api.get("/tickets");
      setTickets(response.data);
    } catch (error) {
      console.error("Erro ao buscar tickets", error);
    }
  };

  return (
    <>
      <BreadcrumbComponent breadcrumb={pageHeader.breadcrumb} />
      <ToolsComponent onTicketCreated={handleTicketCreated} />
      <TicketTable initialTickets={tickets} />
    </>
  );
};

export default Dashboard;
