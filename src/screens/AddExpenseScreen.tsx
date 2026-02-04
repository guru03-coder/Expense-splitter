import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExpense } from '../context/ExpenseContext';
import { Input } from '../components/ui/Input';
import { GradientButton } from '../components/ui/GradientButton';
import { Edit3, X, ChevronDown } from 'lucide-react';

const CATEGORIES = [
    { name: 'General', icon: '🧾' },
    { name: 'Food', icon: '🍔' },
    { name: 'Transport', icon: '🚗' },
    { name: 'Shopping', icon: '🛍' },
    { name: 'Entmt', icon: '🎬' },
    { name: 'Utilities', icon: '⚡' },
];

export const AddExpenseScreen: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getGroup, addExpense } = useExpense();
    const group = getGroup(id || '');

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('General');
    const [paidBy, setPaidBy] = useState(group?.members[0] || '');
    const [splitBetween, setSplitBetween] = useState<string[]>(group?.members || []);
    const [isPayerDropdownOpen, setIsPayerDropdownOpen] = useState(false);

    if (!group) return null;

    const handleSave = () => {
        const val = parseFloat(amount);
        if (val && description && paidBy && splitBetween.length > 0) {
            addExpense(group.id, {
                description,
                amount: val,
                paidBy,
                splitBetween,
                category: selectedCategory,
            });
            navigate(-1);
        }
    };

    const toggleSplitMember = (member: string) => {
        if (splitBetween.includes(member)) {
            setSplitBetween(splitBetween.filter(m => m !== member));
        } else {
            setSplitBetween([...splitBetween, member]);
        }
    };

    return (
        <div className="min-h-screen bg-background relative flex flex-col">
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }} />

            {/* Header */}
            <div className="flex items-center justify-between p-6">
                <button onClick={() => navigate(-1)} className="p-2">
                    <X size={24} />
                </button>
                <h1 className="text-lg font-bold">Add Expense</h1>
                <div className="w-10"></div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-24">
                {/* Amount Input */}
                <div className="flex flex-col items-center mt-4 mb-8">
                    <span className="text-sm text-gray-500 mb-2">Total Amount</span>
                    <div className="flex items-start">
                        <span className="text-2xl font-bold mt-2 mr-1">₹</span>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0"
                            className="bg-transparent text-6xl font-bold w-full text-center outline-none p-0 max-w-[200px]"
                            autoFocus
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <Input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What is this for?"
                        icon={<Edit3 size={18} />}
                    />

                    {/* Categories */}
                    <div>
                        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.name}
                                    onClick={() => setSelectedCategory(cat.name)}
                                    className={`flex flex-col items-center justify-center min-w-[70px] h-[70px] rounded-2xl border transition-all ${selectedCategory === cat.name
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-gray-500 border-gray-100'
                                        }`}
                                >
                                    <span className="text-xl mb-1">{cat.icon}</span>
                                    <span className="text-[10px] font-medium">{cat.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Paid By & Split */}
                    <div className="bg-white rounded-[20px] p-5 shadow-sm">
                        <div className="flex justify-between items-center mb-4 relative">
                            <span className="font-semibold text-sm">Paid by</span>
                            <button
                                onClick={() => setIsPayerDropdownOpen(!isPayerDropdownOpen)}
                                className="flex items-center gap-2 text-sm font-medium bg-gray-50 px-3 py-1.5 rounded-lg text-gray-800"
                            >
                                {paidBy} <ChevronDown size={14} />
                            </button>

                            {isPayerDropdownOpen && (
                                <div className="absolute right-0 top-10 bg-white shadow-xl border border-gray-100 rounded-xl z-20 w-40 overflow-hidden">
                                    {group.members.map(m => (
                                        <button
                                            key={m}
                                            onClick={() => { setPaidBy(m); setIsPayerDropdownOpen(false); }}
                                            className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm"
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <hr className="border-gray-100 mb-4" />

                        <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold text-sm">Split with</span>
                            <button
                                onClick={() => setSplitBetween(splitBetween.length === group.members.length ? [] : group.members)}
                                className="text-xs text-gray-500 font-medium"
                            >
                                {splitBetween.length === group.members.length ? 'Deselect All' : 'Select All'}
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {group.members.map(m => {
                                const isSelected = splitBetween.includes(m);
                                return (
                                    <button
                                        key={m}
                                        onClick={() => toggleSplitMember(m)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${isSelected ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        {m}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-6 left-6 right-6">
                <GradientButton
                    text="Save Expense"
                    fullWidth
                    onClick={handleSave}
                    disabled={!amount || !description || splitBetween.length === 0}
                />
            </div>
        </div>
    );
};
