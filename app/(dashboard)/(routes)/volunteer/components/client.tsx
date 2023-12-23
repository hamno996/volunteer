"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-tabel";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { File, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { VolunteerColumn, columns } from "./columns";
import * as XLSX from "xlsx";

interface VolunteerClientProps {
  data: VolunteerColumn[];
}

export const VolunteerClient: React.FC<VolunteerClientProps> = ({ data }) => {
  const router = useRouter();

  const exportToXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "VolunteerData");
    XLSX.writeFile(workbook, "volunteer_data.xlsx");
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="خۆبەشاکان" description="بەڕێوەبردنی خۆبەخشەکان" />
        <Button onClick={() => router.push("/volunteer/new")}>
          <Plus className="mr-2 h-4 w-4" />
          زیادکردن
        </Button>
      </div>
      <Separator />
      <Button
        onClick={exportToXLSX}
        className="flex items-center justify-center gap-x-3"
      >
        <File size={18} />
        Export To Excel
      </Button>
      <DataTable searchKey={["name", "code"]} columns={columns} data={data} />
    </>
  );
};
