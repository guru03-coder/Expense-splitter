import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, onClick }) => {
    return (
        <motion.div
            whileTap={onClick ? { scale: 0.98 } : {}}
            onClick={onClick}
            className={cn(
                "relative overflow-hidden rounded-[20px] bg-white/65 border-[1.5px] border-white/80 shadow-[0_5px_15px_rgba(0,0,0,0.05)] backdrop-blur-md p-4 transition-all",
                onClick && "cursor-pointer hover:bg-white/75",
                className
            )}
        >
            {children}
        </motion.div>
    );
};
