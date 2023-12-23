"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type VolunteerColumn = {
  id: string;
  name: string;
  code: string;
  dateOfGraduation: string;
  createdAt: string;
};

export const columns: ColumnDef<VolunteerColumn>[] = [
  {
    accessorKey: "name",
    header: "ناو",
  },
  {
    accessorKey: "code",
    header: "کۆد",
  },
  {
    accessorKey: "dateOfGraduation",
    header: "ڕۆژی دەرچوون",
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
