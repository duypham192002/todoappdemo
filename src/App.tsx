import { TodoProvider } from "./components/TodoList/Context/TodoContext";
import TodoList from "./components/TodoList";

function App() {
  return (
    <TodoProvider>
      <div className="hero w-full h-72 absolute top-0 left-0 bg-gradient-to-r from-sky-500 to-fuchsia-500 bg-no-repeat object-cover bg-cover ">
        <div className="container mx-auto max-w-2xl flex flex-col gap-5">
          <h1 className="text-5xl text-center py-10">MY TASK</h1>
          <TodoList />
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
