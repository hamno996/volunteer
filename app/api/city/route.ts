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

    const city = await prismadb.city.create({
      data: {
        name,
      },
    });
    return NextResponse.json(city);
  } catch (error) {
    console.log("[CITY_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
