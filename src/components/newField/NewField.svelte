<script lang="ts">
import {expenses} from '../../store/expenses';

let description = '';
let amount: number;
const handleNewExpense = () => {
    expenses.update(expense => [...expense, {
        description,
        amount,
        expenseCreation: new Date(),
    }])
}

</script>

<div class="new-expense">
    <div class="new-expense__content">
        <span>new expense</span>
        <form on:submit|preventDefault={handleNewExpense}>
            <label for="description">description</label>
            <input id="description" type="text" bind:value={description}>
            <label for="amount">amount</label>
            <input id="amount" type="text" bind:value={amount}>
            <button type="submit" aria-label="save-expense">save</button>
        </form>
    </div>
</div>

<style>

</style>