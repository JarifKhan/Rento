import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
	req: NextRequest,
	context: { params: { id: string } }
) {
	try {
		const { id } = context.params;

		if (!id) {
			return NextResponse.json(
				{ ok: false, error: "Property ID is required" },
				{ status: 400 }
			);
		}

		const col = await getCollection("properties");

		// Try to find by MongoDB ObjectId first, then by custom id field
		let property;

		if (ObjectId.isValid(id)) {
			property = await col.findOne({ _id: new ObjectId(id) });
		}

		if (!property) {
			// Try finding by custom id field (numeric)
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
