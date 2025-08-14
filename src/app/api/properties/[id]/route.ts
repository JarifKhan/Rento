import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { ObjectId } from "bson";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params; // 👈 await it!

		if (!id) {
			return NextResponse.json(
				{ ok: false, error: "Property ID is required" },
				{ status: 400 }
			);
		}

		const col = await getCollection("properties");

		let property;

		if (ObjectId.isValid(id)) {
			property = await col.findOne({ _id: new ObjectId(id) });
		}

		if (!property) {
			const numericId = parseInt(id);
			if (!isNaN(numericId)) {
				property = await col.findOne({ id: numericId });
			}
		}

		if (!property) {
			return NextResponse.json(
				{ ok: false, error: "Property not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ ok: true, property });
	} catch (err) {
		const message = err instanceof Error ? err.message : "Unknown error";
		console.error("GET /api/properties/[id] error", err);
		return NextResponse.json(
			{ ok: false, error: message },
			{ status: 500 }
		);
	}
}
