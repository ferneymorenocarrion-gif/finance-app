<script lang="ts">
import {expenses} from '../../store/expenses';

let description = '';
let amount: number | string;
const handleNewExpense = () => {
    expenses.update(expense => [...expense, {
        description,
        amount,
        expenseCreation: new Date(),
    }])

    description = '';
    amount = '';
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

<style lang="scss">
    .new-expense {
        border: 1px solid white;
        padding: 10px 20px 20px;
        width: 50%;

        form {
            display: flex;
            flex-direction: column;
            text-align: left;

            label {
                margin-bottom: 5px;
            }

            input {
                margin-bottom: 20px;
            }

            button {
                margin-top: 15px;
                background: none;
                border: 1px solid white;
                padding: 10px 5px;
            }
        }
    }
</style>