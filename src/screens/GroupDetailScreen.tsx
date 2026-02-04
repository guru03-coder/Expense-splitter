import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExpense } from '../context/ExpenseContext';
import { GlassCard } from '../components/ui/GlassCard';
import { ArrowLeft, MoreHorizontal, Receipt, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';

export const GroupDetailScreen: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getGroup } = useExpense();
    const group = getGroup(id || '');

    if (!group) {
        return <div className="p-8 text-center text-gray-500">Group not found</div>;
    }

    const totalExpense = group.expenses.reduce((sum, e) => sum + e.amount, 0);

    return (
        <div className="min-h-screen bg-background relative flex flex-col">
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }} />

            {/* AppBar */}
            <div className="flex items-center justify-between p-6 relative z-10">
                <button
                    onClick={() => navigate('/')}
                    className="p-2.5 bg-white border border-gray-100 rounded-xl shadow-sm"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-lg font-bold">{group.name}</h1>
                <button className="p-2.5">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <div className="px-6 space-y-6 flex-1 flex flex-col">
                {/* Total Card */}
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <GlassCard className="p-6 text-center">
                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Total Expense</div>
                        <div className="text-3xl font-bold mb-6">₹{totalExpense.toFixed(2)}</div>

                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => navigate(`/group/${group.id}/settlements`)}
                                className="flex items-center px-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-semibold shadow-sm hover:bg-gray-50 transition-colors"
                            >
                                <Handshake size={16} className="mr-2" />
                                Settle Up
                            </button>
                            <button
                                onClick={() => navigate(`/group/${group.id}/add-expense`)}
                                className="flex items-center px-5 py-2.5 bg-black text-white rounded-full text-sm font-semibold shadow-md active:scale-95 transition-transform"
                            >
                                <div className="bg-white/20 rounded-full p-0.5 mr-2">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                </div>
                                Add Expense
                            </button>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Members */}
                <div>
                    <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                        {group.members.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 + 0.2 }}
                                className="flex flex-col items-center min-w-[60px]"
                            >
                                <div className="w-14 h-14 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-xl font-medium mb-2">
                                    {member[0].toUpperCase()}
                                </div>
                                <span className="text-xs font-medium text-gray-600 truncate max-w-full">{member}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Expenses List */}
                <div className="flex-1 bg-white rounded-t-[32px] shadow-[0_-5px_20px_rgba(0,0,0,0.02)] -mx-6 px-6 pt-8 pb-10 mt-4">
                    <h2 className="text-xl font-bold mb-6">Expenses</h2>

                    <div className="space-y-6">
                        {group.expenses.length === 0 ? (
                            <div className="text-center text-gray-400 py-10">
                                No expenses yet
                            </div>
                        ) : (
                            group.expenses.map((expense, i) => (
                                <motion.div
                                    key={expense.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center"
                                >
                                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-500 mr-4">
                                        <Receipt size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-base">{expense.description}</h3>
                                        <p className="text-xs text-gray-500">{expense.paidBy} paid</p>
                                    </div>
                                    <div className="text-base font-bold">
                                        ₹{expense.amount.toFixed(0)}
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
