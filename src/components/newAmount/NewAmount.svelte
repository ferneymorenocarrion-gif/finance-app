<script lang="ts">
import {amounts} from '../../store/amounts';
import type {Amount} from '../../types/common'

let description: string;
let amount: number | string;
let typeOfAmount: string;

$: isDisabled = !description || !amount || !typeOfAmount;

const handleNewExpense = () => {
    amounts.update((amountInfo: Amount[]) => [...amountInfo, {
        description,
        amount,
        amountCreation: new Date(),
        type: typeOfAmount,
    }])

    description = '';
    amount = '';
    typeOfAmount = '';
}

</script>

<div class="new-amount">
    <span class="new-amount__title">new amount</span>
    <div class="new-amount__content">
        <form on:submit|preventDefault={handleNewExpense}>
            <label for="description">description</label>
            <input id="description" type="text" bind:value={description}>
            <label for="amount">amount</label>
            <input id="amount" type="text" bind:value={amount}>
            <label for="type-of-amount">type of amount</label>
            <select name='type of amount' id="type-of-amount" bind:value={typeOfAmount}>
                <option value=''></option>
                <option value='expense'>Expense</option>
                <option value='income'>Income</option>
            </select>
            <button disabled={isDisabled} type="submit" aria-label="save-expense">save</button>
        </form>
    </div>
</div>

<style lang="scss">
    .new-amount {
        border: 1px solid white;
        padding: 10px 20px 20px;
        width: 100%;
        background-color: #2566ed;
        position: relative;
        overflow: hidden;

        &__title {
            position: absolute;
            left: -5px;
            top: 5px;
            font-size: 70px;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.2);
        }

        &__content {
            margin-top: 35px;
        }

        form {
            display: flex;
            flex-direction: column;
            text-align: left;

            label {
                margin-bottom: 5px;
                color: #fff;
                text-transform: capitalize;
            }

            input, select {
                margin-bottom: 20px;
                background: none;
                border: 1px solid #fff;
                padding: 10px;
                background-color: #a6c0f8;
                color: #000000;
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