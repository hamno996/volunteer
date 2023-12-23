import prismadb from "@/lib/prismadb";
import VolunteerForm from "./components/VolunteerForm";

const VolunteerPage = async ({
	params,
}: {
	params: { volunteerId: string };
}) => {
	const volunteer = await prismadb.volunteer.findUnique({
		where: {
			id: params.volunteerId,
		},
	});

	const city = await prismadb.city.findMany({});
	const town = await prismadb.town.findMany({});
	const street = await prismadb.street.findMany({});

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<VolunteerForm
					city={city}
					town={town}
					street={street}
					initialData={volunteer}
				/>
			</div>
		</div>
	);
};

export default VolunteerPage;
