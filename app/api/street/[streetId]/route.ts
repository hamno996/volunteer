import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { streetId: string } }
) {
  try {
    const body = await req.json();

    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.streetId) {
      return new NextResponse("Store ID is requied", { status: 400 });
    }

    const street = await prismadb.street.updateMany({
      where: {
        id: params.streetId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(street);
  } catch (error) {
    console.log("[STREET_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { streetId: string } }
) {
  try {
    if (!params.streetId) {
      return new NextResponse("City ID is requied", { status: 400 });
    }

    const street = await prismadb.street.delete({
      where: {
        id: params.streetId,
      },
    });

    return NextResponse.json(street);
  } catch (error) {
    console.log("[STREET_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
