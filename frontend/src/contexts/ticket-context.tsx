"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/app/api/axios/api";
import toast from "react-hot-toast";

type Ticket = {
  id: number;
  intention: string;
  reason: string;
  description: string;
  userId: string;
  vehicles: string[];
  createdAt: string;
  status: string;
};

interface TicketContextProps {
  tickets: Ticket[];
  fetchTickets: () => Promise<void>;
  addTicket: (ticket: Ticket) => Promise<void>;
  updateTicket: (updatedTicket: Ticket) => Promise<void>;
  deleteTicket: (ticketId: number) => Promise<void>;
}

const TicketContext = createContext<TicketContextProps | undefined>(undefined);

export const useTickets = (): TicketContextProps => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTickets deve ser usado dentro de um TicketProvider");
  }
  return context;
};

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const fetchTickets = async () => {
    try {
      const response = await api.get("/tickets");
      setTickets(response.data);
    } catch (error) {
      console.error("Erro ao buscar tickets", error);
      toast.error("Erro ao buscar tickets");
    }
  };

  const addTicket = async (ticket: Ticket) => {
    try {
      const response = await api.post("/tickets", ticket);
      setTickets((prevTickets) => [...prevTickets, response.data]);
      toast.success("Ticket adicionado com sucesso");
    } catch (error) {
      console.error("Erro ao adicionar ticket:", error);
      toast.error("Erro ao adicionar ticket");
    }
  };

  const updateTicket = async (updatedTicket: Ticket) => {
    try {
      await api.put(`/tickets/${updatedTicket.id}`, updatedTicket);
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === updatedTicket.id ? updatedTicket : ticket
        )
      );
      toast.success("Ticket atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar o ticket:", error);
      toast.error("Erro ao atualizar o ticket");
    }
  };

  const deleteTicket = async (ticketId: number) => {
    try {
      await api.delete(`/tickets/${ticketId}`);
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket.id !== ticketId)
      );
      toast.success("Ticket excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir o ticket:", error);
      toast.error("Erro ao excluir o ticket");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <TicketContext.Provider
      value={{
        tickets,
        fetchTickets,
        addTicket,
        updateTicket,
        deleteTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
