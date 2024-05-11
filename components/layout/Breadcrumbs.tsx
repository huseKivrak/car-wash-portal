"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { capitalize } from "@/lib/utils";
import Link from "next/link";
import { CarIcon, SquareUserIcon } from "lucide-react";
export function Breadcrumbs() {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path !== "");

  const items = [
    <BreadcrumbItem key="home">
      <BreadcrumbLink asChild className="max-w-20 truncate md:max-w-none">
        <Link href="/">Home</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>,
  ];

  pathNames.forEach((path, index) => {
    let content: React.ReactNode = capitalize(path);

    if (!isNaN(Number(path)) && index > 0) {
      if (pathNames[index - 1] === "users") {
        content = <SquareUserIcon className="h-4 w-4" />;
      } else if (pathNames[index - 1] === "subscriptions") {
        content = <CarIcon className="h-4 w-4" />;
      }
    }

    items.push(
      <React.Fragment key={index}>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="max-w-20 truncate md:max-w-none">
            <Link href={`/${pathNames.slice(0, index + 1).join("/")}`}>
              {content}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </React.Fragment>,
    );
  });

  if (pathNames.length === 0) return null;
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-lg tracking-widest">
        {items}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
