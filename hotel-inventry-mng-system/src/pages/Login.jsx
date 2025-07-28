import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'; // useDispatch is used to dispatch actions to the Redux store
import { login } from '../features/authSlice'; //login here is the action creator you defined in authSlice.
//import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const user = await authService.login(data.email, data.password);
    dispatch(login(user)); // Dispatch the login action with the user data
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <label className="block mb-2">Email</label>
        <input
          {...register('email', { required: true })}
          className="w-full border px-3 py-2 rounded mb-4"
          placeholder="you@example.com"
        />
        {errors.email && <p className="text-red-500 text-sm">Email is required.</p>}

        <label className="block mb-2">Password</label>
        <input
          type="password"
          {...register('password', { required: true })}
          className="w-full border px-3 py-2 rounded mb-4"
          placeholder="••••••••"
        />
        {errors.password && <p className="text-red-500 text-sm">Password is required.</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
