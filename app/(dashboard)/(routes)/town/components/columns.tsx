"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type TownColumn = {
  id: string;
  name: string;
  createdAt: string;
};

export const columns: ColumnDef<TownColumn>[] = [
  {
    accessorKey: "name",
    header: "ناوی قەزا",
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
