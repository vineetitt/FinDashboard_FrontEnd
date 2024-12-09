import React, { useState } from 'react'
import signUpUser from '../apiServices/SignUpServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignUp:React.FC = () => {
    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
    const isValidPassword = (password: string) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
        return passwordRegex.test(password);
      };
    const handleSignup = async (e: React.FormEvent)=>{
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        } 
        if(!isValidEmail(email))
        {
            toast.error('Invalid email! Format: example@domain.com');
            return 
        }
        if(!isValidPassword(password)){
            toast.error('Invalid password! Format: At least 8 characters, including uppercase, lowercase, number, and special character');
            return;
        }
        try
        {
            await signUpUser(username, email, password);
            navigate('/');
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch(error:any )
        {
            console.log(error);
            toast.error(error.message);
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-6 bg-white shadow rounded-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Signup</h2>
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-md"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border rounded-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-md"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                        Signup
                    </button>
                </form>
            </div>
        </div>
  )
}

export default SignUp