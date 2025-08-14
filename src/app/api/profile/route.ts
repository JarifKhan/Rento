import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const collection = await getCollection("profiles");
    // Hash the password before saving
    let hashedPassword = undefined;
    if (body.password) {
      hashedPassword = await bcrypt.hash(body.password, 10);
    }
    const result = await collection.insertOne({
      ...body,
      ...(hashedPassword ? { password: hashedPassword } : {}),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    return NextResponse.json({ success: false, error: error?.toString() }, { status: 500 });
  }
}
