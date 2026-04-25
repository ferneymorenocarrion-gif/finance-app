<script lang="ts">
import {income} from '../../store/income';
    import type { Income } from '../../types/common';

let amount: Income;
const handleIncome = () => {
    income.update((income) => Number(income) + Number(amount))
    amount = '';
}

</script>

<div class="income">
    <div class="income__content">
        <span>new income</span>
        <form on:submit|preventDefault={handleIncome}>
            <label for="amount">amount</label>
            <input id="amount" type="text" bind:value={amount}>
            <button type="submit" aria-label="add-income">add</button>
        </form>
    </div>
</div>

<style lang="scss">
    .income {
        border: 1px solid white;
        padding: 10px 20px 20px;
        width: 100%;

        form {
            display: flex;
            flex-direction: column;
            text-align: left;

            label {
                margin-bottom: 5px;
            }

            input {
                margin-bottom: 20px;
                background: none;
                border: 1px solid #fff;
                padding: 10px;
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