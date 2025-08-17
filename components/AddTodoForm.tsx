'use client';

import { useFormStatus } from 'react-dom';
import { createTodoAction } from '@/app/actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} style={{padding: '0.5rem 0.75rem', borderRadius: 8}}>
      {pending ? 'Adding…' : 'Add'}
    </button>
  );
}

export default function AddTodoForm() {
  return (
    <form action={createTodoAction} style={{display: 'flex', gap: '0.5rem'}}>
      <input
        type="text"
        name="title"
        placeholder="What needs to be done?"
        aria-label="Todo title"
        required
        style={{flex: 1, padding: '0.5rem 0.75rem', borderRadius: 8, border: '1px solid #ddd'}}
      />
      <SubmitButton />
    </form>
  );
}
