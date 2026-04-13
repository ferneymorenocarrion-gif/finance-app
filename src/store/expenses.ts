import { writable } from "svelte/store";

interface Expenses {
    description: string;
    amount: number;
    expenseCreation: Date;
}

const expensesKey = 'expenses';

const storedExpenses = localStorage.getItem(expensesKey);
const initialExpensesValue = storedExpenses ? JSON.parse(storedExpenses) : [];

export const expenses = writable<Expenses[]>(initialExpensesValue);

expenses.subscribe((expenseData) => {
    localStorage.setItem(expensesKey, JSON.stringify(expenseData))
})