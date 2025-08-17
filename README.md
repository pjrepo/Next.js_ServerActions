# Todos — Server Components + Server Actions (No `useEffect` Fetching)

This example fetches data in **Server Components** (and a **Route Handler**) and uses **Server Actions** for writes.

- Read: `app/page.tsx` → fetches from our own `/api/todos` (which merges JSONPlaceholder todos with in-memory writes)
- Write: `app/actions.ts` → `createTodoAction`, `toggleTodoAction`
- No `useEffect` used for fetching
- Input validation with Zod in the API
- `revalidate = 60` for the external source; `no-store` for the page list so writes reflect immediately after `revalidatePath('/')`

## Run locally

```bash
pnpm i   # or npm i / yarn
pnpm dev # or npm run dev / yarn dev
```

Then open http://localhost:3000

### Environment note

If you deploy behind a reverse proxy, set `NEXT_PUBLIC_BASE_URL` to your origin (e.g. `http://localhost:3000`) so the server fetch in `app/page.tsx` hits your Route Handler correctly.
