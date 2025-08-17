import { NextResponse } from 'next/server';
import { TodoSchema, type Todo } from '@/lib/types';
import { listLocalTodos, addLocalTodo, toggleLocalTodo } from '@/lib/store';

export const revalidate = 60; // cache external fetch for 60s

async function fetchExternalTodos(): Promise<Todo[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=20', {
    // Cache the external source separately; route combines with local writes
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Upstream error: ${res.status}`);
  const data = await res.json();
  // Validate & coerce
  const parsed = Array.isArray(data) ? data.map((t) => TodoSchema.parse(t)) : [];
  return parsed;
}

export async function GET() {
  const external = await fetchExternalTodos();
  const local = listLocalTodos();
  // Local first so new items appear on top
  return NextResponse.json([...local, ...external]);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  const created = addLocalTodo(title);
  return NextResponse.json(created, { status: 201 });
}

export async function PATCH(req: Request) {
  const body = await req.json().catch(() => ({}));
  const id = Number(body.id);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Valid id is required' }, { status: 400 });
  const updated = toggleLocalTodo(id);
  if (!updated) return NextResponse.json({ error: 'Only locally-added todos are toggleable in this demo' }, { status: 404 });
  return NextResponse.json(updated);
}
