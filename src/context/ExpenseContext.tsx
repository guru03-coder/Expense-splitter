import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ExpenseGroup, Expense, Settlement } from '../models/types';
import { v4 as uuidv4 } from 'uuid';

interface ExpenseContextType {
    groups: ExpenseGroup[];
    isLoading: boolean;
    addGroup: (name: string, members: string[], iconCode?: number) => void;
    deleteGroup: (id: string) => void;
    getGroup: (id: string) => ExpenseGroup | undefined;
    addExpense: (groupId: string, expense: Omit<Expense, 'id' | 'date'>) => void;
    deleteExpense: (groupId: string, expenseId: string) => void;
    calculateSettlements: (group: ExpenseGroup) => Settlement[];
    getTotalExpenses: () => number;
    getTotalGroups: () => number;
    getTotalMembers: () => number;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const useExpense = () => {
    const context = useContext(ExpenseContext);
    if (!context) {
        throw new Error('useExpense must be used within an ExpenseProvider');
    }
    return context;
};

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [groups, setGroups] = useState<ExpenseGroup[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load from LocalStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('expense_groups');
        if (stored) {
            try {
                setGroups(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse groups", e);
            }
        }
        setIsLoading(false);
    }, []);

    // Save to LocalStorage on change
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('expense_groups', JSON.stringify(groups));
        }
    }, [groups, isLoading]);

    const addGroup = (name: string, members: string[], iconCode?: number) => {
        const newGroup: ExpenseGroup = {
            id: uuidv4(),
            name,
            members,
            iconCodePoint: iconCode,
            expenses: [],
        };
        setGroups(prev => [...prev, newGroup]);
    };

    const deleteGroup = (id: string) => {
        setGroups(prev => prev.filter(g => g.id !== id));
    };

    const getGroup = (id: string) => {
        return groups.find(g => g.id === id);
    };

    const addExpense = (groupId: string, expenseData: Omit<Expense, 'id' | 'date'>) => {
        const newExpense: Expense = {
            ...expenseData,
            id: uuidv4(),
            date: new Date().toISOString(),
            groupId,
        };

        setGroups(prev => prev.map(g => {
            if (g.id === groupId) {
                return { ...g, expenses: [newExpense, ...g.expenses] };
            }
            return g;
        }));
    };

    const deleteExpense = (groupId: string, expenseId: string) => {
        setGroups(prev => prev.map(g => {
            if (g.id === groupId) {
                return { ...g, expenses: g.expenses.filter(e => e.id !== expenseId) };
            }
            return g;
        }));
    };

    const calculateSettlements = (group: ExpenseGroup): Settlement[] => {
        const balances: { [key: string]: number } = {};
        group.members.forEach(m => balances[m] = 0);

        group.expenses.forEach(expense => {
            const splitAmount = expense.amount / expense.splitBetween.length;
            balances[expense.paidBy] = (balances[expense.paidBy] || 0) + expense.amount;
            expense.splitBetween.forEach(member => {
                balances[member] = (balances[member] || 0) - splitAmount;
            });
        });

        const settlements: Settlement[] = [];

        // Convert to mutable entries
        let debtors = Object.entries(balances).filter(([, val]) => val < -0.01).sort((a, b) => a[1] - b[1]); // Ascending (most negative first)
        let creditors = Object.entries(balances).filter(([, val]) => val > 0.01).sort((a, b) => b[1] - a[1]); // Descending (most positive first)

        let i = 0; // debtor index
        let j = 0; // creditor index

        while (i < debtors.length && j < creditors.length) {
            const debtor = debtors[i];
            const creditor = creditors[j];

            const amount = Math.min(Math.abs(debtor[1]), creditor[1]);

            settlements.push({
                from: debtor[0],
                to: creditor[0],
                amount: Number(amount.toFixed(2)),
            });

            debtor[1] += amount;
            creditor[1] -= amount;

            if (Math.abs(debtor[1]) < 0.01) i++;
            if (creditor[1] < 0.01) j++;
        }

        return settlements;
    };

    const getTotalExpenses = () => {
        return groups.reduce((acc, group) => {
            return acc + group.expenses.reduce((sum, e) => sum + e.amount, 0);
        }, 0);
    };

    const getTotalGroups = () => groups.length;

    const getTotalMembers = () => {
        const allMembers = new Set<string>();
        groups.forEach(g => g.members.forEach(m => allMembers.add(m)));
        return allMembers.size;
    };

    return (
        <ExpenseContext.Provider value={{
            groups,
            isLoading,
            addGroup,
            deleteGroup,
            getGroup,
            addExpense,
            deleteExpense,
            calculateSettlements,
            getTotalExpenses,
            getTotalGroups,
            getTotalMembers
        }}>
            {children}
        </ExpenseContext.Provider>
    );
};
