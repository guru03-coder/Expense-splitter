import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ icon, className, ...props }) => {
    return (
        <div className={cn(
            "flex items-center bg-white rounded-2xl shadow-[0_4px_10px_rgba(0,0,0,0.03)] px-5 py-4",
            className
        )}>
            {icon && <span className="text-gray-500 mr-3">{icon}</span>}
            <input
                className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-gray-400 text-black"
                {...props}
            />
        </div>
    );
};
