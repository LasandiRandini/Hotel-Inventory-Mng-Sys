// src/pages/Login.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((s) => s.auth);
  const [apiError, setApiError] = useState("");

  const onSubmit = async (data) => {
    setApiError("");
    const res = await dispatch(login({ username: data.username, password: data.password }));
    if (login.fulfilled.match(res)) {
      navigate("/");
    } else {
      setApiError(res.payload || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in</h2>

        {apiError && <div className="mb-4 text-sm text-red-600">{apiError}</div>}

        <label className="block mb-2">Username</label>
        <input
          {...register("username", { required: "Username is required" })}
          className="w-full border px-3 py-2 rounded mb-3"
          placeholder="admin"
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

        <label className="block mb-2">Password</label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          className="w-full border px-3 py-2 rounded mb-6"
          placeholder="••••••••"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {status === "loading" ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
