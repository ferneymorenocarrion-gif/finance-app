import { writable } from "svelte/store";
import type { Income } from "../types/common";

const incomeKey = 'income';

const storedIncome = localStorage.getItem(incomeKey);
const initialIncomeValue = storedIncome ? JSON.parse(storedIncome) : 0;

export const income = writable<Income>(initialIncomeValue);

income.subscribe((incomeValue) => {
    localStorage.setItem(incomeKey, JSON.stringify(incomeValue))
})