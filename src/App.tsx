import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="container mx-auto max-w-2xl flex flex-col gap-5">
      <h1 className="text-5xl text-center py-10">MY TASK</h1>
      <TodoList />
    </div>
  );
}

export default App;
