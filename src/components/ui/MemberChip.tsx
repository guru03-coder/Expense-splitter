import React from 'react';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';

interface MemberChipProps {
    name: string;
    isSelected?: boolean;
    onDelete?: () => void;
    onClick?: () => void;
    className?: string;
}

export const MemberChip: React.FC<MemberChipProps> = ({
    name,
    isSelected,
    onDelete,
    onClick,
    className
}) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                "inline-flex items-center px-3 py-2 rounded-xl transition-all cursor-pointer border select-none",
                isSelected
                    ? "bg-black text-white border-black shadow-md"
                    : "bg-white text-black border-black/10 hover:border-black/30",
                className
            )}
        >
            <div className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mr-2",
                isSelected ? "bg-white/20 text-white" : "bg-gray-200 text-black"
            )}>
                {name[0].toUpperCase()}
            </div>
            <span className="text-[13px] font-medium">{name}</span>
            {onDelete && (
                <div
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    className={cn("ml-2 hover:bg-black/20 rounded-full p-0.5", isSelected ? "text-white/70" : "text-black/40")}
                >
                    <X size={12} />
                </div>
            )}
        </div>
    );
};
