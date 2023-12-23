import { format } from "date-fns";
import prismadb from "@/lib/prismadb";

import { CityClient } from "./components/client";
import { CityColumn } from "./components/columns";

const CitiesPage = async () => {
  const city = await prismadb.city.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCity: CityColumn[] = city.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CityClient data={formattedCity} />
      </div>
    </div>
  );
};

export default CitiesPage;
