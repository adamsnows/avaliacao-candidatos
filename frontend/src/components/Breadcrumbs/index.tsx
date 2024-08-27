import React from "react";
import Breadcrumb from "./breadcrumb-component";
import cn from "@/utils/class-names";

export type BreadcrumbData = {
  breadcrumb: { name: string | React.ReactNode; href?: string }[];
  className?: string;
};

const BreadcrumbComponent = ({ breadcrumb, className }: BreadcrumbData) => {
  return (
    <>
      <div className={cn("my-2", className)}>
        <Breadcrumb separator="" separatorVariant="arrow" className="flex-wrap">
          {breadcrumb.map((item) => (
            <Breadcrumb.Item
              key={item.href}
              {...(item.href && { href: item.href })}
            >
              {item.name}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
      <div className="border-b border-gray-300" />
    </>
  );
};

export default BreadcrumbComponent;
