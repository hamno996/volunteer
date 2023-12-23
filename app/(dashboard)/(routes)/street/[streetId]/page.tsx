import prismadb from "@/lib/prismadb";
import StreetForm from "./components/TownForm";

const TownPage = async ({ params }: { params: { streetId: string } }) => {
  const street = await prismadb.street.findUnique({
    where: {
      id: params.streetId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <StreetForm initialData={street} />
      </div>
    </div>
  );
};

export default TownPage;
