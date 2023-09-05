import { useState } from "react";

import { useLogin } from "hooks/useLogin";
import { useAlreadyLog } from "hooks/useAlreadyLog";

export const Login = () => {
  useAlreadyLog();

  const { VITE_SERVER_URL } = import.meta.env;

  console.log('VITE URL', VITE_SERVER_URL)

  const [loginUser, setLoginUser] = useState({
    email: "@example.com",
    password: "Flutilliant31&",
  });

  const { login, isLoading, error } = useLogin();

  const handleChange = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(loginUser.email, loginUser.password);
  };

  return (
    <form
      className="px-10 mt-10 grid grid-cols-1 gap-y-4 justify-items-center items-center"
      onSubmit={handleSubmit}
    >
      <h1 className="title w-64 md:w-80">Login</h1>
      <div className="mb-3 w-64 md:w-80">
        <label htmlFor="email" className="label">
          Email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="input"
          value={loginUser.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3 w-64 md:w-80">
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="input"
          value={loginUser.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <button className="btn btn-yellow w-64 md:w-80 justify-center" disabled={isLoading} type="submit">
          Login
        </button>
        {error && <div className="text-red-500 pt-4 w-64 md:w-80 text-center">{error}</div>}
      </div>
      {/* example email */}
      <div className="text-start">
        <p className="text-gray-500">Admin email:
          <span className="text-yellow-600">  nicky.larsen@example.com</span>
        </p>
        <p className="text-gray-500">Salesman email:
          <span className="text-yellow-600">  vangelis@example.com</span>
        </p>
      </div>
    </form>
  );
};

export default Login;
