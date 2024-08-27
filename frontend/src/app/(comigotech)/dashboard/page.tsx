"use client";

import BreadcrumbComponent from "@/components/Breadcrumbs";
import { useSession } from "next-auth/react";
import { FaHouse } from "react-icons/fa6";

const pageHeader = {
  breadcrumb: [
    {
      href: "/",
      name: <FaHouse />,
    },
    {
      name: "Atendimento ao cliente",
    },
  ],
};

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <>
      <BreadcrumbComponent breadcrumb={pageHeader.breadcrumb} />
    </>
  );
};

export default Dashboard;
