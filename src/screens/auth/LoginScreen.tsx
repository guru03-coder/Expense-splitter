import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { GradientButton } from '../../components/ui/GradientButton';
import { Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoginScreen: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Just navigate to Home for now
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-background flex flex-col justify-center px-8 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }} />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
                <p className="text-gray-500">Sign in to your account</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
            >
                <Input placeholder="Email" icon={<Mail size={20} />} />
                <Input type="password" placeholder="Password" icon={<Lock size={20} />} />

                <div className="pt-8">
                    <GradientButton text="Sign In" fullWidth onClick={handleLogin} />
                </div>

                <div className="text-center pt-4">
                    <button onClick={handleLogin} className="text-gray-500 font-medium text-sm hover:text-black transition-colors">
                        Continue as Guest
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
