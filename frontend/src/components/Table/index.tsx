"use client";

import { Badge, Loader, Table } from "rizzui";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import EditTicketModal from "../Modals/edit-ticket";
import { useModal } from "@/contexts/modal-context";
import { useEffect, useState } from "react";
import api from "@/app/api/axios/api";
import toast from "react-hot-toast";

const TicketTable = ({ initialTickets }) => {
  const { openModal } = useModal();
  const [tickets, setTickets] = useState(initialTickets);

  useEffect(() => {
    setTickets(initialTickets);
  }, [initialTickets]);

  const handleEditClick = (ticket) => {
    openModal(<EditTicketModal initialData={ticket} onUpdate={updateTicket} />);
  };

  const updateTicket = async () => {
    try {
      const response = await api.get("/tickets");
      setTickets(response.data);

      setTimeout(() => {
        toast.success("Tickets atualizados com sucesso");
      }, 2000);
    } catch (error) {
      console.error("Erro ao atualizar o ticket:", error);
      toast.error("Erro ao atualizar o ticket");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const calculateDueDate = (createdAt) => {
    const date = new Date(createdAt);
    date.setDate(date.getDate() + 7);
    return formatDate(date);
  };

  if (!tickets) {
    return <Loader size="lg" className="mt-10 mx-auto" />;
  }

  return (
    <div className="mt-6">
      <Table className="text-gray-800 font-light text-sm border-spacing-y-2 border-separate">
        <Table.Header>
          <Table.Row>
            <Table.Head>ID</Table.Head>
            <Table.Head>Tipo</Table.Head>
            <Table.Head>Motivo</Table.Head>
            <Table.Head>Descrição</Table.Head>
            <Table.Head>Cliente</Table.Head>
            <Table.Head>Veículo</Table.Head>
            <Table.Head>Data da abertura</Table.Head>
            <Table.Head>Prazo</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head className="flex justify-end">Ações</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tickets.map((ticket) => (
            <Table.Row key={ticket.id} className="bg-white ">
              <Table.Cell>#{ticket.id}</Table.Cell>
              <Table.Cell>{ticket.intention}</Table.Cell>
              <Table.Cell>{ticket.reason || "N/A"}</Table.Cell>
              <Table.Cell>{ticket.description}</Table.Cell>
              <Table.Cell>{ticket.userId || "N/A"}</Table.Cell>
              <Table.Cell>{ticket.vehicles.join(", ") || "N/A"}</Table.Cell>
              <Table.Cell>{formatDate(ticket.createdAt)}</Table.Cell>
              <Table.Cell>{calculateDueDate(ticket.createdAt)}</Table.Cell>
              <Table.Cell>
                <Badge>{ticket.status}</Badge>
              </Table.Cell>
              <Table.Cell className="flex items-center justify-end gap-2 mt-1">
                <MdOutlineEdit
                  className="cursor-pointer text-lg"
                  onClick={() => handleEditClick(ticket)}
                />
                <FaRegTrashAlt className="text-red-500 cursor-pointer text-lg" />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="mt-6 text-xs text-gray-500 flex justify-center">
        Exibindo {tickets.length} de {tickets.length} do total de{" "}
        {tickets.length} registros
      </div>
    </div>
  );
};

export default TicketTable;
