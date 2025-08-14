import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import type { Document } from 'mongodb';

interface Property extends Document {
  id: number;
  title: string;
  location: string;
  price: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  features: string[];
  rating?: number;
  reviews?: number;
  image?: string;
  isAvailable?: boolean;
  created_at: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic validation
    const required = ['title', 'location', 'price', 'type', 'bedrooms', 'bathrooms', 'area'];
    for (const key of required) {
      if (!(key in body)) return NextResponse.json({ error: `${key} is required` }, { status: 400 });
    }

    const col = await getCollection<Property>('properties');

    const doc: Property = {
      id: Math.floor(Date.now() / 1000),
      title: String(body.title),
      location: String(body.location),
      price: String(body.price),
      type: String(body.type),
      bedrooms: Number(body.bedrooms),
      bathrooms: Number(body.bathrooms),
      area: Number(body.area),
      features: Array.isArray(body.features) ? body.features.map(String) : [],
      rating: 0,
      reviews: 0,
      image: body.image ? String(body.image) : undefined,
      isAvailable: true,
      created_at: new Date().toISOString(),
    };

    const result = await col.insertOne(doc);
    return NextResponse.json({ ok: true, id: result.insertedId, property: doc });
  } catch (err) {
    console.error('POST /api/admin/properties error', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
