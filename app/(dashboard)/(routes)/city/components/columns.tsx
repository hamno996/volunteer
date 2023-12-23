"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type CityColumn = {
  id: string;
  name: string;
  createdAt: string;
};

export const columns: ColumnDef<CityColumn>[] = [
  {
    accessorKey: "name",
    header: "ناوی شار",
  },
  {
    accessorKey: "createdAt",
    header: "ڕێکەوت",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
