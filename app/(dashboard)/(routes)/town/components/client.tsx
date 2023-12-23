"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-tabel";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { TownColumn, columns } from "./columns";

interface TownClientProps {
  data: TownColumn[];
}

export const TownClient: React.FC<TownClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="قەزا" description="بەڕێوەبردنی قەزاکان" />
        <Button onClick={() => router.push("/town/new")}>
          <Plus className="mr-2 h-4 w-4" />
          زیادکردن
        </Button>
      </div>
      <Separator />
      <DataTable searchKey={["name"]} columns={columns} data={data} />
    </>
  );
};
