import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';

interface Notification {
  id: number;
  user_id: number;
  type: 'message' | 'event' | 'user' | string;
  title: string;
  content: string;
  sender_name?: string;
  is_read: boolean;
  created_at: string; // ISO
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = Number(searchParams.get('user_id'));

    const col = await getCollection<Notification>('notifications');
    const query = userId ? { user_id: userId } : {};
    const notifications = await col.find(query).sort({ created_at: -1 }).limit(50).toArray();

    return NextResponse.json({ notifications });
  } catch (err) {
    console.error('GET /api/notifications error', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const col = await getCollection<Notification>('notifications');

    if (body.action === 'mark_read' && typeof body.notification_id === 'number') {
      await col.updateOne({ id: body.notification_id }, { $set: { is_read: true } });
      return NextResponse.json({ ok: true });
    }

    if (body.action === 'mark_all_read' && typeof body.user_id === 'number') {
      await col.updateMany({ user_id: body.user_id }, { $set: { is_read: true } });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  } catch (err) {
    console.error('PUT /api/notifications error', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
