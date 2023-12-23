import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { volunteerId: string } }
) {
  try {
    const body = await req.json();

    const {
      imageUrl,
      name,
      gender,
      age,
      phoneNumber,
      email,
      cityId,
      townId,
      streetId,
      dateOfGraduation,
      specialty,
      degree,
      code,
      dateOfServe,
      income,
      placeOfWork,
      member,
    } = body;

    if (!params.volunteerId) {
      return new NextResponse("Store ID is requied", { status: 400 });
    }

    const volunteer = await prismadb.volunteer.updateMany({
      where: {
        id: params.volunteerId,
      },
      data: {
        imageUrl,
        name,
        gender,
        age,
        phoneNumber,
        email,
        cityId,
        townId,
        streetId,
        dateOfGraduation,
        specialty,
        degree,
        code,
        dateOfServe,
        income,
        placeOfWork,
        member,
      },
    });

    return NextResponse.json(volunteer);
  } catch (error) {
    console.log("[VOLUNTEER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { volunteerId: string } }
) {
  try {
    if (!params.volunteerId) {
      return new NextResponse("City ID is requied", { status: 400 });
    }

    const volunteer = await prismadb.volunteer.delete({
      where: {
        id: params.volunteerId,
      },
    });

    return NextResponse.json(volunteer);
  } catch (error) {
    console.log("[VOLUNTEER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
