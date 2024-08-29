"use client";

import BreadcrumbComponent from "@/components/Breadcrumbs";
import TicketTable from "@/components/Table";
import ToolsComponent from "@/components/Tools";
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
  return (
    <>
      <BreadcrumbComponent breadcrumb={pageHeader.breadcrumb} />
      <ToolsComponent />
      <TicketTable />
    </>
  );
};

export default Dashboard;
