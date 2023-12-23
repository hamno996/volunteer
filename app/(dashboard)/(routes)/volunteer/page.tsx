import prismadb from "@/lib/prismadb";
import { VolunteerColumn } from "./components/columns";
import { format } from "date-fns";
import { VolunteerClient } from "./components/client";

const VolunteersPage = async () => {
  const volunteer = await prismadb.volunteer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedVolunteer: VolunteerColumn[] = volunteer.map((item) => ({
    id: item.id,
    name: item.name,
    code: item.code,
    dateOfGraduation: item.dateOfGraduation,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <VolunteerClient data={formattedVolunteer} />
      </div>
    </div>
  );
};

export default VolunteersPage;
