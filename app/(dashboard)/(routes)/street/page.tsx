import { format } from "date-fns";
import prismadb from "@/lib/prismadb";

import { StreetClient } from "./components/client";
import { StreetColumn } from "./components/columns";

const TownsPage = async () => {
  const street = await prismadb.street.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedStreet: StreetColumn[] = street.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <StreetClient data={formattedStreet} />
      </div>
    </div>
  );
};

export default TownsPage;
