import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { cityId: string } }
) {
  try {
    const body = await req.json();

    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.cityId) {
      return new NextResponse("Store ID is requied", { status: 400 });
    }

    const city = await prismadb.city.updateMany({
      where: {
        id: params.cityId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(city);
  } catch (error) {
    console.log("[CITY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { cityId: string } }
) {
  try {
    if (!params.cityId) {
      return new NextResponse("City ID is requied", { status: 400 });
    }

    const city = await prismadb.city.delete({
      where: {
        id: params.cityId,
      },
    });

    return NextResponse.json(city);
  } catch (error) {
    console.log("[CITY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
