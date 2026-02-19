import { useState, type FC, type FormEvent } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo.svg';

const Login: FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        // Simulate login for now
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#1a472a] to-[#d97706] relative overflow-hidden flex items-center justify-center p-4">
            {/* Decorative Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12 z-10">
                {/* Left Side - Branding */}
                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="mb-8 relative">
                        {/* Logo 3D Effect Wrapper */}
                        <img src={logo} alt="SimpleVia Logo" className="w-48 h-48 drop-shadow-2xl" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-5xl font-bold text-white tracking-wider">SIMPLEVIA</h1>
                        <p className="text-xl text-white/90 font-light tracking-widest">Technologies, Inc</p>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="flex-1 w-full max-w-md">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome!</h2>
                        <h3 className="text-xl font-medium text-white">HR Management Information System</h3>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-500 group-focus-within:text-[var(--color-primary)] transition-colors" />
                            </div>
                            <input
                                type="text"
                                required
                                className="block w-full pl-10 pr-3 py-3 bg-white border-0 rounded-lg shadow-sm focus:ring-2 focus:ring-[var(--color-primary)] placeholder-gray-400 transition-all font-medium"
                                placeholder="Username"
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-[var(--color-primary)] transition-colors" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                className="block w-full pl-10 pr-10 py-3 bg-white border-0 rounded-lg shadow-sm focus:ring-2 focus:ring-[var(--color-primary)] placeholder-gray-400 transition-all font-medium"
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                )}
                            </button>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg transform transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Login
                            </button>
                        </div>

                        <div className="flex items-center justify-end">
                            <a href="#" className="text-sm font-medium text-gray-800 hover:text-white transition-colors">
                                Forgot Password?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
