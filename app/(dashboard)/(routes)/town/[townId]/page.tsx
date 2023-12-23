import prismadb from "@/lib/prismadb";
import TownForm from "./components/TownForm";

const TownPage = async ({ params }: { params: { townId: string } }) => {
  const town = await prismadb.town.findUnique({
    where: {
      id: params.townId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TownForm initialData={town} />
      </div>
    </div>
  );
};

export default TownPage;
