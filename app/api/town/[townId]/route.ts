import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { townId: string } }
) {
  try {
    const body = await req.json();

    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.townId) {
      return new NextResponse("Store ID is requied", { status: 400 });
    }

    const town = await prismadb.town.updateMany({
      where: {
        id: params.townId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(town);
  } catch (error) {
    console.log("[TOWN_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { townId: string } }
) {
  try {
    if (!params.townId) {
      return new NextResponse("City ID is requied", { status: 400 });
    }

    const town = await prismadb.town.delete({
      where: {
        id: params.townId,
      },
    });

    return NextResponse.json(town);
  } catch (error) {
    console.log("[TOWN_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
