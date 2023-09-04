import { useState } from "react";

import { useRegister } from "hooks/useRegister";
import { useAlreadyLog } from "hooks/useAlreadyLog";

export const Register = () => {
  useAlreadyLog();

  const [registerUser, setUserRegister] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { register, isLoading, error } = useRegister();

  const handleChange = (e) => {
    setUserRegister({ ...registerUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(
      registerUser.username,
      registerUser.email,
      registerUser.password
    );
  };

  return (
    <form
      className="px-10 mt-10 grid grid-cols-1 gap-y-4 justify-items-center items-center"
      onSubmit={handleSubmit}
    >
      <h1 className="title w-64 md:w-80">Register</h1>
      <div className="mb-3 w-64 md:w-80">
        <label htmlFor="username" className="label">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="input"
          value={registerUser.username}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3 w-64 md:w-80">
        <label htmlFor="email" className="label">
          Email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="input"
          value={registerUser.email}
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
          value={registerUser.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <button
          className="btn btn-yellow w-64 md:w-80 justify-center"
          disabled={isLoading}
          type="submit"
        >
          Register
        </button>
      </div>
      {error && (
        <div className="text-red-500 pt-4 w-64 md:w-80 text-center">
          {error}
        </div>
      )}
    </form>
  );
};

export default Register;
