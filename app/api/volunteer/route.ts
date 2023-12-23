import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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

    const volunteer = await prismadb.volunteer.create({
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
    console.log("[VOLUNTEER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
