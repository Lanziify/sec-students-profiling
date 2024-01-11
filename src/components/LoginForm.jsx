import React, { useState } from "react";
import { Validation } from "../utils/Validation";
import { useAuth } from "../context/AuthContext";
import { AuthErrorCodes } from "firebase/auth";
import { ErrorHandler } from "../utils/ErrorHandler";

const LoginForm = () => {
  const { loginUser } = useAuth();
  const [value, setValue] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: null, password: null });
  const [loading, setLoading] = useState(false);

  const Fields = [
    {
      name: "email",
      value: value.email,
      error: error.email,
      placeholder: "Email",
      type: "text",
    },
    {
      name: "password",
      value: value.password,
      error: error.password,
      placeholder: "Password",
      type: "password",
    },
  ];

  const handleOnChange = (e) => {
    const currentFieldError = Validation.validateLogin({
      [e.target.name]: e.target.value,
    });
    setValue({ ...value, [e.target.name]: e.target.value });
    setError({
      ...error,
      [e.target.name]: currentFieldError[e.target.name] ? "" : "VALID",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = Validation.validateLogin(value);
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
    } else {
      try {
        setLoading(true);
        await loginUser(value.email, value.password);
        setLoading(false);
      } catch (error) {
        const errorMessage = ErrorHandler.AuthError(error, AuthErrorCodes);
        setError({ ...error, authError: errorMessage });
        setLoading(false);
      }
    }
  };
  return (
    <form
      className="m-auto flex w-[24rem] flex-col gap-2 p-4"
      onSubmit={handleSubmit}
    >
      <div className="text-center">
        <h1 className="text-xl font-extrabold uppercase text-blue-500">
          Sayon Elementary School
        </h1>
        <p>Students Management System</p>
      </div>

      {error.authError && (
        <div className="rounded-md bg-red-500 p-1 text-center text-xs text-white">
          <span>{error.authError}</span>
        </div>
      )}

      {Fields.map((field, index) => (
        <div key={index} className="flex flex-col">
          <input
            className={`rounded-md border px-3 py-1 ${
              field.error === null || error.authError
                ? "border-gray-400"
                : field.error != "VALID" && field.error != undefined
                  ? "border-red-500"
                  : "border-green-500"
            }`}
            name={field.name}
            value={field.value}
            type={field.type}
            placeholder={field.placeholder}
            onChange={handleOnChange}
          />

          <span className="text-xs text-red-500">
            {field.error != "VALID" ? field.error : ""}
          </span>
        </div>
      ))}
      <button
        type="submit"
        className="rounded-md bg-blue-500  px-3 py-1 font-semibold text-white"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
