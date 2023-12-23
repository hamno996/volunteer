import Dashboard from "@/components/dashboard";
import prismadb from "@/lib/prismadb";

export default async function Home() {
  const volunteer = await prismadb.volunteer.findMany({});
  return (
    <div>
      <Dashboard volunteer={volunteer} />
    </div>
  );
}
