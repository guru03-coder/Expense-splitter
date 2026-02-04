import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpense } from '../context/ExpenseContext';
import { Input } from '../components/ui/Input';
import { GradientButton } from '../components/ui/GradientButton';
import { MemberChip } from '../components/ui/MemberChip';
import { ArrowLeft, Users, Type } from 'lucide-react';
import { motion } from 'framer-motion';

export const CreateGroupScreen: React.FC = () => {
    const navigate = useNavigate();
    const { addGroup } = useExpense();

    const [name, setName] = useState('');
    const [memberInput, setMemberInput] = useState('');
    const [members, setMembers] = useState<string[]>([]);

    const handleAddMember = () => {
        if (memberInput.trim()) {
            setMembers([...members, memberInput.trim()]);
            setMemberInput('');
        }
    };

    const handleCreate = () => {
        if (name && members.length > 0) {
            addGroup(name, members);
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-background relative px-6 pt-6">
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }} />

            {/* App Bar */}
            <div className="flex items-center justify-between mb-8 relative z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2.5 bg-white border border-gray-100 rounded-xl shadow-sm"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold">New Group</h1>
                <div className="w-10" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2 ml-1">Group Name</label>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Trip to Goa"
                        icon={<Type size={18} />}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2 ml-1">Add Members</label>
                    <div className="flex gap-2">
                        <Input
                            value={memberInput}
                            onChange={(e) => setMemberInput(e.target.value)}
                            placeholder="Name"
                            icon={<Users size={18} />}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddMember()}
                            className="flex-1"
                        />
                        <button
                            onClick={handleAddMember}
                            className="bg-black text-white px-4 rounded-2xl font-semibold"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Member Chips */}
                <div className="flex flex-wrap gap-2">
                    {members.map((m, i) => (
                        <MemberChip
                            key={i}
                            name={m}
                            onDelete={() => setMembers(members.filter((_, idx) => idx !== i))}
                        />
                    ))}
                </div>
            </motion.div>

            <div className="fixed bottom-8 left-6 right-6">
                <GradientButton
                    text="Create Group"
                    fullWidth
                    onClick={handleCreate}
                    disabled={!name || members.length === 0}
                />
            </div>
        </div>
    );
};
