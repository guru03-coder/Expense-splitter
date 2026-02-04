import React from 'react';
import { useExpense } from '../context/ExpenseContext';
import { GlassCard } from '../components/ui/GlassCard';
import { Wallet, Users, LayoutGrid, Plus, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const HomeScreen: React.FC = () => {
    const { groups, getTotalExpenses, getTotalGroups, getTotalMembers, isLoading } = useExpense();
    const navigate = useNavigate();

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div></div>;
    }

    const stats = [
        { title: 'Total Spent', value: `₹${getTotalExpenses().toFixed(0)}`, icon: <Wallet size={20} /> },
        { title: 'Groups', value: getTotalGroups().toString(), icon: <LayoutGrid size={20} /> },
        { title: 'Members', value: getTotalMembers().toString(), icon: <Users size={20} /> },
    ];

    return (
        <div className="relative min-h-screen bg-background pb-20">
            {/* Minimal Grid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }} />

            <div className="relative pt-8 px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 mb-8"
                >
                    <div className="p-2.5 bg-white rounded-[14px] shadow-sm shadow-black/5">
                        <Wallet className="text-black" size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-black tracking-tight">Expense Splitter</h1>
                        <p className="text-[13px] text-gray-500">Track & split expenses</p>
                    </div>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar"
                >
                    {stats.map((stat, i) => (
                        <GlassCard key={i} className="min-w-[110px] flex-shrink-0 p-4 rounded-[20px]">
                            <div className="text-gray-800 mb-6">{stat.icon}</div>
                            <div className="text-xl font-bold text-black">{stat.value}</div>
                            <div className="text-[11px] text-gray-500">{stat.title}</div>
                        </GlassCard>
                    ))}
                </motion.div>

                {/* Groups Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-between mt-8 mb-4 px-1"
                >
                    <h2 className="text-xl font-bold text-black">Your Groups</h2>
                    <div className="px-3 py-1.5 bg-white rounded-full border border-gray-200">
                        <span className="text-xs font-semibold text-gray-700">{groups.length} groups</span>
                    </div>
                </motion.div>

                {/* Groups List */}
                <div className="space-y-3">
                    {groups.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="bg-gray-100 p-4 rounded-full inline-block mb-4">
                                <LayoutGrid size={32} className="text-gray-300" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700">No Groups Yet</h3>
                            <p className="text-sm text-gray-400">Create a group to start splitting</p>
                        </div>
                    ) : (
                        groups.map((group, i) => (
                            <motion.div
                                key={group.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link to={`/group/${group.id}`}>
                                    <GlassCard className="flex items-center p-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-black/80 mr-4">
                                            {/* Placeholder Icon */}
                                            <LayoutGrid size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-base text-gray-900">{group.name}</h3>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {group.members.length} members • ₹{group.expenses.reduce((s, e) => s + e.amount, 0).toFixed(0)} spent
                                            </p>
                                        </div>
                                        <ChevronRight className="text-gray-300" size={20} />
                                    </GlassCard>
                                </Link>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            {/* FAB */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                onClick={() => navigate('/create-group')}
                className="fixed bottom-6 right-6 bg-black text-white px-5 py-3.5 rounded-2xl shadow-lg flex items-center gap-2 font-semibold hover:bg-gray-900 active:scale-95 transition-transform z-10"
            >
                <Plus size={20} />
                New Group
            </motion.button>
        </div>
    );
};
