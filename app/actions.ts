'use server';

import { revalidatePath } from 'next/cache';
import { addLocalTodo, toggleLocalTodo } from '@/lib/store';

export async function createTodoAction(formData: FormData) {
  const title = (formData.get('title') || '').toString().trim();
  if (!title) throw new Error('Title is required');
  addLocalTodo(title);
  // Invalidate the home page so fresh data is fetched server-side
  revalidatePath('/');
}

export async function toggleTodoAction(formData: FormData) {
  const idStr = (formData.get('id') || '').toString();
  const id = Number(idStr);
  if (!Number.isFinite(id)) throw new Error('Invalid id');
  const updated = toggleLocalTodo(id);
  if (!updated) throw new Error('Only locally-added todos can be toggled in this demo');
  revalidatePath('/');
}
