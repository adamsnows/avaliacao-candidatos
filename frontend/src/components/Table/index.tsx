"use client";

import { Badge, Button, Loader, Table } from "rizzui";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import EditTicketModal from "../Modals/edit-ticket";
import { useModal } from "@/contexts/modal-context";
import { useState, useEffect } from "react";
import { useTickets } from "@/contexts/ticket-context";

const TicketTable = () => {
  const { filteredTickets, fetchTickets, deleteTicket, updateTicket } =
    useTickets();
  const { openModal } = useModal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleEditClick = (ticket: any) => {
    openModal(<EditTicketModal initialData={ticket} />);
  };

  const handleDeleteClick = (ticketId: number) => {
    setTicketToDelete(ticketId);
    setIsModalOpen(true);
  };

  const confirmDeleteTicket = async () => {
    if (ticketToDelete === null) return;
    await deleteTicket(ticketToDelete);
    setIsModalOpen(false);
    setTicketToDelete(null);
  };

  const formatDate = (date?: string) => {
    return date
      ? new Date(date).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "N/A";
  };

  const calculateDueDate = (createdAt?: string) => {
    if (!createdAt) return "N/A";
    const date = new Date(createdAt);
    date.setDate(date.getDate() + 7);
    return formatDate(date.toISOString());
  };

  if (!filteredTickets) {
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
            <Table.Head>Cliente</Table.Head>
            <Table.Head>Veículo</Table.Head>
            <Table.Head>Data da abertura</Table.Head>
            <Table.Head>Prazo</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head className="flex justify-end">Ações</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredTickets.map((ticket) => (
            <Table.Row key={ticket.id} className="bg-white">
              <Table.Cell>#{ticket.id}</Table.Cell>
              <Table.Cell>{ticket.intention || "N/A"}</Table.Cell>
              <Table.Cell>{ticket.reason || "N/A"}</Table.Cell>
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
                <FaRegTrashAlt
                  className="text-red-500 cursor-pointer text-lg"
                  onClick={() => handleDeleteClick(ticket.id)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="mt-6 text-xs text-gray-500 flex justify-center">
        Exibindo {filteredTickets.length} de {filteredTickets.length} do total
        de {filteredTickets.length} registros
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirmar</h2>
            <p className="mb-4 text-sm text-gray-500">
              Deseja realmente apagar este ticket?
            </p>
            <div className="flex gap-4 w-full">
              <Button
                className="bg-blue-500 text-white w-full"
                onClick={confirmDeleteTicket}
              >
                Sim
              </Button>
              <Button
                className="bg-gray-300 text-gray-800 w-full"
                onClick={() => setIsModalOpen(false)}
              >
                Não
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketTable;
