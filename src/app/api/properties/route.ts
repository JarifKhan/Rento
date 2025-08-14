import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function GET() {
	try {
		const col = await getCollection("properties");
		const properties = await col.find({}).toArray();
		return NextResponse.json({ ok: true, properties });
	} catch (err) {
		const message = err instanceof Error ? err.message : "Unknown error";
		return NextResponse.json(
			{ ok: false, error: message },
			{ status: 500 }
		);
	}
}
