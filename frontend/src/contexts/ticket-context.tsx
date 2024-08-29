"use client";

import React, { createContext, useContext, useState } from "react";
import api from "@/app/api/axios/api";
import toast from "react-hot-toast";

type Ticket = {
  client?: any;
  type?: any;
  id?: number;
  intention: string;
  reason: string;
  userId: string;
  vehicles: string[];
  createdAt?: string;
  status: string;
};

interface TicketContextProps {
  tickets: Ticket[];
  filteredTickets: Ticket[];
  fetchTickets: () => Promise<void>;
  addTicket: (ticket: Ticket) => Promise<void>;
  updateTicket: (id: any, updatedTicket: Ticket) => Promise<void>;
  deleteTicket: (ticketId: number) => Promise<void>;
  applyFilters: (filters: any) => void;
  refreshTickets: () => void;
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
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);

  const fetchTickets = async () => {
    try {
      const response = await api.get("/tickets");
      const sortedTickets = response.data.sort(
        (a: Ticket, b: Ticket) => (a.id || 0) - (b.id || 0)
      );
      setTickets(sortedTickets);
      setFilteredTickets(sortedTickets);
    } catch (error) {
      console.error("Erro ao buscar tickets", error);
      toast.error("Erro ao buscar tickets");
    }
  };

  const refreshTickets = async () => {
    await fetchTickets();
  };

  const addTicket = async (ticket: Ticket) => {
    try {
      const response = await api.post("/tickets", ticket);
      setTickets((prevTickets) =>
        [...prevTickets, response.data].sort(
          (a: Ticket, b: Ticket) => (a.id || 0) - (b.id || 0)
        )
      );
      toast.success("Ticket adicionado com sucesso");
    } catch (error) {
      console.error("Erro ao adicionar ticket:", error);
      toast.error("Erro ao adicionar ticket");
    }
  };

  const updateTicket = async (id: any, updatedTicket: Ticket) => {
    try {
      await api.put(`/tickets/${id}`, updatedTicket);
      setTickets((prevTickets) =>
        prevTickets
          .map((ticket) =>
            ticket.id === updatedTicket.id ? updatedTicket : ticket
          )
          .sort((a: Ticket, b: Ticket) => (a.id || 0) - (b.id || 0))
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
        prevTickets
          .filter((ticket) => ticket.id !== ticketId)
          .sort((a: Ticket, b: Ticket) => (a.id || 0) - (b.id || 0))
      );
      toast.success("Ticket excluído com sucesso");
      refreshTickets();
    } catch (error) {
      console.error("Erro ao excluir o ticket:", error);
      toast.error("Erro ao excluir o ticket");
    }
  };

  const applyFilters = (filters: any) => {
    let filtered = tickets;

    if (filters.status) {
      filtered = filtered.filter((ticket) => ticket.status === filters.status);
    }
    if (filters.type) {
      filtered = filtered.filter((ticket) => ticket.type === filters.type);
    }
    if (filters.reason) {
      filtered = filtered.filter((ticket) => ticket.reason === filters.reason);
    }
    if (filters.client) {
      filtered = filtered.filter((ticket) => ticket.client === filters.client);
    }
    if (filters.vehicle) {
      filtered = filtered.filter((ticket) =>
        ticket.vehicles.includes(filters.vehicle)
      );
    }

    if (filters.orderBy) {
      filtered = filtered.sort((a, b) => {
        if (filters.orderBy === "createdAt") {
          return (
            new Date(a.createdAt || "").getTime() -
            new Date(b.createdAt || "").getTime()
          );
        } else {
          return filters.orderBy === "desc" ? b.id - a.id : a.id - b.id;
        }
      });
    }

    setFilteredTickets(filtered);
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        filteredTickets,
        fetchTickets,
        addTicket,
        updateTicket,
        deleteTicket,
        applyFilters,
        refreshTickets,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
