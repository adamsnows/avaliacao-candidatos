import { Badge, Table } from "rizzui";
import { MdOutlineEdit } from "react-icons/md";

import { FaRegTrashAlt } from "react-icons/fa";

const TicketTable = () => {
  return (
    <Table className="text-gray-800 font-light text-sm mt-6">
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
        <Table.Row>
          <Table.Cell>#110</Table.Cell>
          <Table.Cell>Suporte</Table.Cell>
          <Table.Cell>Incidente</Table.Cell>
          <Table.Cell>Veículos sem comunicação</Table.Cell>
          <Table.Cell>Veículos sem comunicação</Table.Cell>
          <Table.Cell>Veículos 2, Veículos 6</Table.Cell>
          <Table.Cell>02/07/2023</Table.Cell>
          <Table.Cell>05/05/2023</Table.Cell>
          <Table.Cell>
            <Badge>À fazer</Badge>
          </Table.Cell>
          <Table.Cell className="flex gap-2 justify-end">
            <MdOutlineEdit className="cursor-pointer" />
            <FaRegTrashAlt className="text-red-500 cursor-pointer" />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default TicketTable;
