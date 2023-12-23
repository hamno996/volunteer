import { format } from "date-fns";
import prismadb from "@/lib/prismadb";

import { TownClient } from "./components/client";
import { TownColumn } from "./components/columns";

const TownsPage = async () => {
  const town = await prismadb.town.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedTown: TownColumn[] = town.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TownClient data={formattedTown} />
      </div>
    </div>
  );
};

export default TownsPage;
