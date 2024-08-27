"use client";

import BreadcrumbComponent from "@/components/Breadcrumbs";
import ToolsComponent from "@/components/Tools";
import { useSession } from "next-auth/react";
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
  const { data: session } = useSession();

  return (
    <>
      <BreadcrumbComponent breadcrumb={pageHeader.breadcrumb} />
      <ToolsComponent />
    </>
  );
};

export default Dashboard;
