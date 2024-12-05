import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./pages/TodoList";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import Header from "./components/Header";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          {/* Navigation Bar */}
          <Header />
          <div className="bg-gradient-to-r from-sky-500 to-fuchsia-500 bg-no-repeat object-cover bg-cover">
            {/* Routes */}
            <Routes>
              <Route
                path="/"
                element={
                  <div className="container mx-auto max-w-2xl flex flex-col">
                    <h1 className="text-5xl text-center py-10">MY TASK</h1>
                    <TodoList />
                  </div>
                }
              />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
