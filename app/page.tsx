import TodoList from '@/components/TodoList';
import AddTodoForm from '@/components/AddTodoForm';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId?: number;
};

async function getTodos(): Promise<Todo[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/todos`, {
    // We want the freshest list after actions revalidate the path
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to load todos');
  return res.json();
}

export default async function Page() {
  const todos = await getTodos();

  return (
    <section>
      <header style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1rem'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 700}}>Todos</h1>
        <span style={{opacity: 0.7}}>{todos.length} items</span>
      </header>

      <div style={{display:'grid', gap:'1rem'}}>
        <AddTodoForm />
        {/* Server-rendered list */}
        {/* Pass props down to a (mostly) server component tree */}
        {/* Client islands handle form submissions via Server Actions */}
        {/* No useEffect anywhere for data fetching */}
        <TodoList todos={todos} />
      </div>

      {/* <p style={{marginTop:'1rem', fontSize:12, opacity:0.7}}>
        Note: Items loaded from the public API are read-only. New items you add here are stored in-memory on the server for demonstration.
      </p> */}
    </section>
  );
}
