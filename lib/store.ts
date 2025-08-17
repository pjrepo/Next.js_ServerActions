import type { Todo } from './types';

// ⚠️ Demo-only in-memory store. In serverless/edge this resets on cold starts.
// Replace with a real DB (MongoDB, Postgres, etc.) for production persistence.
let nextId = 10001;
const localTodos = new Map<number, Todo>();

export function listLocalTodos(): Todo[] {
  return Array.from(localTodos.values()).sort((a,b) => b.id - a.id);
}

export function addLocalTodo(title: string): Todo {
  const todo: Todo = { id: nextId++, title, completed: false };
  localTodos.set(todo.id, todo);
  return todo;
}

export function toggleLocalTodo(id: number): Todo | undefined {
  const t = localTodos.get(id);
  if (!t) return undefined;
  const updated = { ...t, completed: !t.completed };
  localTodos.set(id, updated);
  return updated;
}
