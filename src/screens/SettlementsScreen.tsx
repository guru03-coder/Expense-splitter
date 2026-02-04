import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExpense } from '../context/ExpenseContext';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const SettlementsScreen: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getGroup, calculateSettlements } = useExpense();
    const group = getGroup(id || '');

    if (!group) return null;

    const settlements = calculateSettlements(group);

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="flex items-center mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2.5 bg-white border border-gray-100 rounded-xl shadow-sm mr-4"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold">Settlements</h1>
            </div>

            <div className="space-y-4">
                {settlements.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <CheckCircle2 size={48} className="mx-auto mb-4 text-green-500 opacity-50" />
                        <h3 className="text-lg font-medium text-black">All Settled Up!</h3>
                        <p className="text-sm mt-1">No pending payments in this group.</p>
                    </div>
                ) : (
                    settlements.map((settlement, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 font-bold text-xs ring-2 ring-white">
                                    {settlement.from[0]}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm">{settlement.from}</span>
                                    <span className="text-[10px] text-gray-500 uppercase font-medium">Pays</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center px-4">
                                <div className="text-sm font-bold text-black mb-1">₹{settlement.amount}</div>
                                <div className="w-20 h-0.5 bg-gray-200 relative">
                                    <div className="absolute right-0 -top-1 w-2 h-2 bg-gray-300 rotate-45 transform translate-x-1"></div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 justify-end">
                                <div className="text-right">
                                    <span className="font-semibold text-sm block">{settlement.to}</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-bold text-xs ring-2 ring-white">
                                    {settlement.to[0]}
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};
