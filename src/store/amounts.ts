import { writable } from "svelte/store";
import type { Amount } from "../types/common";

export const amountsKey = 'amounts';

const storedAmounts = localStorage.getItem(amountsKey);
const initialAmountsValue = storedAmounts ? JSON.parse(storedAmounts) : [];

export const amounts = writable<Amount[]>(initialAmountsValue);

amounts.subscribe((amountData) => {
    localStorage.setItem(amountsKey, JSON.stringify(amountData));
})