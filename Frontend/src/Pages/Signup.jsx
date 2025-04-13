// src/Pages/SignupPage.jsx (Place it in your Pages directory)
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link

const API_URL = 'http://localhost:5001/api/auth'; // Your backend Signup endpoint

function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            // Make sure password meets backend requirements if any
            await axios.post(`${API_URL}/signup`, { username, email, password });
            setSuccess('Signup successful! Redirecting to login...');
            // Redirect to login after a short delay
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            console.error('Signup failed:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-128px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="rounded-md bg-red-50 p-4 mb-4">
                             <p className="text-sm font-medium text-red-800">{error}</p>
                        </div>
                    )}
                     {success && (
                        <div className="rounded-md bg-green-50 p-4 mb-4">
                             <p className="text-sm font-medium text-green-800">{success}</p>
                        </div>
                    )}
                    <div className="rounded-md shadow-sm -space-y-px">
                        {/* Username Input */}
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input
                                id="username" name="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Username" />
                        </div>
                        {/* Email Input */}
                         <div>
                            <label htmlFor="email-address-signup" className="sr-only">Email address</label>
                            <input
                                id="email-address-signup" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address" />
                        </div>
                        {/* Password Input */}
                        <div>
                            <label htmlFor="password-signup" className="sr-only">Password</label>
                            <input
                                id="password-signup" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out">
                            Sign Up
                        </button>
                    </div>
                     <div className="text-sm text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                             {/* --- Link to Login Page --- */}
                            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;