"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type StreetColumn = {
  id: string;
  name: string;
  createdAt: string;
};

export const columns: ColumnDef<StreetColumn>[] = [
  {
    accessorKey: "name",
    header: "ناوی گەڕەک",
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
