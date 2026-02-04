export interface Expense {
    id: string;
    description: string;
    amount: number;
    paidBy: string;
    splitBetween: string[];
    date: string; // ISO string
    category: string;
    groupId?: string;
}

export interface ExpenseGroup {
    id: string;
    name: string;
    members: string[];
    iconCodePoint?: number; // Legacy from Flutter
    iconName?: string; // New for React (Lucide icon name)
    expenses: Expense[];
}

export interface Settlement {
    from: string;
    to: string;
    amount: number;
}
