'use client';
export default function Error({ error }: { error: Error }) {
  return (
    <div style={{color: 'crimson'}}>
      <h2>Something went wrong</h2>
      <pre>{error.message}</pre>
    </div>
  );
}
