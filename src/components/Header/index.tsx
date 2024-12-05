import { Link } from "react-router-dom";

import { getAuth, signOut } from "firebase/auth";
import { useUser } from "../../contexts/UserContext";

const Header = () => {
  const { user } = useUser();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      alert("Logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className="container flex justify-end my-5 mx-auto">
      {user ? (
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Hello, {user.email}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <Link to="/login" className="pr-3">
            Login
          </Link>
          <Link to="/register" className="pl-2">
            Register
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;
