import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const street = await prismadb.street.create({
      data: {
        name,
      },
    });
    return NextResponse.json(street);
  } catch (error) {
    console.log("[STREET_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
