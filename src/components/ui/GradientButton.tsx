import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface GradientButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
    text: string;
    icon?: React.ReactNode;
    isLoading?: boolean;
    fullWidth?: boolean;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
    text,
    icon,
    isLoading,
    fullWidth,
    className,
    ...props
}) => {
    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={cn(
                "h-[52px] bg-black text-white rounded-2xl flex items-center justify-center font-semibold text-base transition-opacity disabled:opacity-50 disabled:cursor-not-allowed",
                fullWidth ? "w-full" : "w-auto px-6",
                className
            )}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                <>
                    {icon && <span className="mr-2">{icon}</span>}
                    {text}
                </>
            )}
        </motion.button>
    );
};
