import { useState } from "react";
import TodoList from "./components/TodoList";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "login" | "signup">(
    "home"
  );

  return (
    <div>
      {currentPage === "home" && (
        <div className="hero w-full h-72 absolute top-0 left-0 bg-gradient-to-r from-sky-500 to-fuchsia-500 bg-no-repeat object-cover bg-cover">
          <div className="absolute p-5 top-0 right-0">
            <button onClick={() => setCurrentPage("login")} className="pr-3">
              Login
            </button>
            <button onClick={() => setCurrentPage("signup")} className="pl-2">
              Register
            </button>
          </div>
          <div className="container mx-auto max-w-2xl flex flex-col gap-5 mt-10">
            <h1 className="text-5xl text-center py-10">MY TASK</h1>
            <TodoList />
          </div>
        </div>
      )}

      {currentPage === "login" && <LoginForm />}

      {currentPage === "signup" && <RegisterForm />}
    </div>
  );
}

export default App;
