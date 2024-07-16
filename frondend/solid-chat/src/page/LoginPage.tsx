import React, { useCallback, useState } from "react";
import { useSession } from "../context/SessionContext";
import { TONE_COLORS } from "../constant/color";

const LoginPage = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const [isDisabled, setIsDisabled] = useState(false);

  // quick fix for button pressed twice
  

  // handle user login
  const { handleUserLogin } = useSession();

  // handle any changes that happens to the form
  // handle any input value and update the
  // user info accordingly
  const handleFormChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserInfo((old) => ({ ...old, [name]: value }));
    },
    []
  );

  // hanle user submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUserLogin(userInfo);
    setIsDisabled(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2
        className="text-4xl font-bold mb-8"
        style={{ color: TONE_COLORS.PRIMARY }}
      >
        Join Solid-Chat !
      </h2>
      {/* create the form now */}

      <form onSubmit={handleSubmit} className="flex flex-col bg-blue-200 shadow-md  px-12 pt-10 pb-12 mb-8 w-96">
        {/* handle user name value */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-lg font-bold mb-4"
            htmlFor="username"
          >
            Username:
          </label>
          {/* the input */}
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="username"
            type="text"
            value={userInfo.username}
            placeholder="Enter your username"
            minLength={6}
            required
            maxLength={100}
            onChange={handleFormChange}
          />
        </div>

        {/* handle password input */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-lg font-bold mb-4"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="password"
            type="text"
            value={userInfo.password}
            placeholder=""
            minLength={6}
            required
            maxLength={100}
            onChange={handleFormChange}
          />
        </div>
        <button
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={isDisabled}
          
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
