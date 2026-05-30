<script lang="ts">
import {amounts, amountsKey} from '../../store/amounts';
import type {Amount} from '../../types/common'
import { v4 as uuidv4 } from "uuid";


export let isAmountFormPopupOpen: boolean = false;
export let itemToEdit: Amount;

console.log('itemToEdit in form', itemToEdit)

let description: string = itemToEdit && itemToEdit.description || '';
let amount: number | string = itemToEdit && itemToEdit.amount || '';
let typeOfAmount: string = itemToEdit && itemToEdit.type || '';

$: isDisabled = !description || !amount || !typeOfAmount;

const handleExpense = () => {

    const isItemPresent = $amounts.find(item => item.id === itemToEdit.id);

    if (isItemPresent) {
        const editedItem = {
            ...itemToEdit,
            description,
            amountCreation: new Date(),
            amount,
            type: typeOfAmount,
        }
        amounts.update((items: Amount[]) => {
            return items.map(item => item.id === editedItem.id ? editedItem : item)
        })
    } else {
        amounts.update((amountInfo: Amount[]) => [{
            description,
            amount,
            amountCreation: new Date(),
            type: typeOfAmount,
            id: uuidv4(),
        }, ...amountInfo]);
    }


    description = '';
    amount = '';
    typeOfAmount = '';
    isAmountFormPopupOpen = false;
}

const handleCloseNewAmountPopup = () => {
    isAmountFormPopupOpen = false;
}

</script>

<div class="amount-form">
    <span class="amount-form__title">Edit Amount</span>
    <div class="amount-form__content">
        <form on:submit|preventDefault={handleExpense}>
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
            <button class="save" disabled={isDisabled} type="submit" aria-label="save-amount">save</button>
            <button class="cancel" aria-label="cancel-amount" on:click={handleCloseNewAmountPopup}>cancel</button>
        </form>
    </div>
</div>

<style lang="scss">
    .amount-form {
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
            min-width: 390px;
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
                border-radius: 0;
            }

            button {
                margin-top: 15px;
                background: none;
                border: 1px solid white;
                padding: 10px 5px;
                text-transform: uppercase;
                font-weight: 600;
                font-size: 16px;
                color: #ffffff;
            }
            
            .cancel {
                background-color: #fca1a2;
            }
        }
    }
</style>