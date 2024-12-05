import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doSignInUserEmailAndPassword } from "../../firebase/auth";
import { useUser } from "../../contexts/UserContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const userCredential = await doSignInUserEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      alert("Login successfully");

      // Cập nhật UserContext
      setUser({
        uid: user.uid,
        email: user.email,
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-sky-500 to-fuchsia-500 rounded-lg py-5 w-full h-full">
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5">
        <div className="flex items-center justify-center w-full lg:p-12">
          <div className="flex items-center">
            <form
              className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl p-5 gap-4"
              onSubmit={handleSubmit}
            >
              <h3 className="text-4xl font-extrabold text-dark-grey-900">
                Sign In
              </h3>
              <p className="text-gray-700">Enter your email and password</p>
              <button
                type="button"
                className="flex items-center justify-center w-full py-4 text-sm font-medium transition duration-300 rounded-2xl text-gray-900 bg-gray-200 hover:bg-gray-300"
              >
                <img
                  className="h-5 mr-2"
                  src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                  alt="Google"
                />
                Sign in with Google
              </button>
              <div className="flex items-center gap-4">
                <hr className="h-0 border-b border-solid border-gray-500 grow" />
                <p className="text-grey-600">or</p>
                <hr className="h-0 border-b border-solid border-gray-500 grow" />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm text-start text-grey-900"
                >
                  Email*
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full px-5 py-4 text-sm font-medium outline-none focus:bg-gray-200 placeholder:text-gray-700 bg-gray-200 text-gray-900 rounded-2xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-sm text-start text-grey-900"
                >
                  Password*
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter a password"
                  className="w-full px-5 py-4 text-sm font-medium outline-none focus:bg-gray-200 placeholder:text-gray-700 bg-gray-200 text-gray-900 rounded-2xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-row justify-between items-center">
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-5 h-5 bg-white border-2 rounded-sm border-grey-500 peer peer-checked:border-0 peer-checked:bg-custom-blue">
                    <img
                      src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png"
                      alt="tick"
                    />
                  </div>
                  <span className="ml-3 text-sm font-normal text-grey-900">
                    Keep me logged in
                  </span>
                </label>
                <a href="#" className="text-sm font-medium text-custom-blue">
                  Forget password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-custom-blue"
              >
                Sign In
              </button>
              <p className="text-sm leading-relaxed text-gray-900">
                Not registered yet?
                <a
                  href="/register"
                  className="font-bold text-gray-700 opacity-50 pl-2"
                >
                  Create an Account
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
