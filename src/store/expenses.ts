import { writable } from "svelte/store";
import type { Expenses } from "../types/common";

const expensesKey = 'expenses';

const storedExpenses = localStorage.getItem(expensesKey);
const initialExpensesValue = storedExpenses ? JSON.parse(storedExpenses) : [];

export const expenses = writable<Expenses[]>(initialExpensesValue);

expenses.subscribe((expenseData) => {
    localStorage.setItem(expensesKey, JSON.stringify(expenseData))
})