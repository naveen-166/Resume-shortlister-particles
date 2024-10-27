import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Particle from './Animations/Particel';
import image from "../assets/login.jpg";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/register', { email, password });
            setMessage(response.data.message);
            if (response.data.success) {
                navigate('/login');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="relative w-screen h-screen flex items-center justify-center bg-black">
            <Particle />
            <div className="relative flex flex-col items-center w-full max-w-md mx-4 p-8 rounded-xl bg-gray-800/70 backdrop-blur-md shadow-lg font-Kanit">
                <h3 className="text-center text-3xl font-bold mb-6 text-white">Register</h3>
                <form onSubmit={handleRegister} className="w-full flex flex-col space-y-6">
                    <label htmlFor="email" className="text-lg font-medium text-gray-200">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                        className="p-3 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <label htmlFor="password" className="text-lg font-medium text-gray-200">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                        className="p-3 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <label htmlFor="confirmPassword" className="text-lg font-medium text-gray-200">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm your password"
                        className="p-3 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 text-white rounded-md font-semibold hover:from-teal-500 hover:via-blue-600 hover:to-purple-700 transition duration-300"
                    >
                        Register
                    </button>
                    <a href='/login' className='text-center text-teal-400 hover:text-teal-300 transition duration-200'>
                        Already a user?
                    </a>
                </form>
                {message && <p className="text-red-400 text-sm text-center mt-4">{message}</p>}
            </div>
        </div>
    );
}

export default Register;
