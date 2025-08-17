'use client';

import { useFormStatus } from 'react-dom';
import { toggleTodoAction } from '@/app/actions';

export default function TodoItem({ id, title, completed, toggleable }:
  { id: number; title: string; completed: boolean; toggleable: boolean; }) {

  function ToggleButton() {
    const { pending } = useFormStatus();
    return (
      <button type="submit" disabled={!toggleable || pending} style={{padding: '0.25rem 0.5rem', borderRadius: 6}}>
        {pending ? '...' : (completed ? 'Mark Incomplete' : 'Mark Complete')}
      </button>
    );
  }

  return (
    <li style={{display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0', borderBottom: '1px solid #f0f0f0'}}>
      <span aria-label={completed ? 'completed' : 'not completed'} title={completed ? 'completed' : 'not completed'}>
        {completed ? '✅' : '⬜️'}
      </span>
      <span style={{flex: 1, opacity: completed ? 0.6 : 1}}>{title}</span>

      <form action={toggleTodoAction}>
        <input type="hidden" name="id" value={id} />
        <ToggleButton />
      </form>

      {/* {!toggleable && (
        <span title="Read-only (from public API)" style={{fontSize: 12, opacity: 0.6}}>
          read‑only
        </span>
      )} */}
    </li>
  );
}
