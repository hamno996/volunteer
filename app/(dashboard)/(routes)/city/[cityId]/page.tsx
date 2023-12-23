import prismadb from "@/lib/prismadb";
import CityForm from "./components/CityForm";

const CityPage = async ({ params }: { params: { cityId: string } }) => {
  const city = await prismadb.city.findUnique({
    where: {
      id: params.cityId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CityForm initialData={city} />
      </div>
    </div>
  );
};

export default CityPage;
