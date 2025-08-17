import TodoItem from './TodoItem';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId?: number;
};

export default async function TodoList({ todos }: { todos: Todo[] }) {
  // This is a Server Component. It only renders a list; stateful bits are in client children.
  return (
    <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
      {todos.map((t) => (
        <TodoItem key={t.id} id={t.id} title={t.title} completed={t.completed} toggleable={t.id >= 10001} />
      ))}
    </ul>
  );
}
