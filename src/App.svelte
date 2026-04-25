<script>
    import NewField from './components/newField/NewField.svelte';
    import {expenses} from './store/expenses';
    import {income} from './store/income';
    import { formatDate } from './utils/dateFormatting';
    import { formatAmount } from './utils/amountFormatter';
    import Income from './components/income/Income.svelte';

    $: totalExpenses = $expenses.reduce((acc, expense) => {
      return acc += Number(expense.amount);
    }, 0)

    const handleClearStorage = () => {
      localStorage.clear();
      window.location.reload();
    }

    $: console.log('expenses', $expenses);
    $: console.log('expense.expenseCreation', $expenses[0]?.expenseCreation);
</script>

<section id="center">
<div class="account-summary">
  <div class="account-summary__income summary"><span>Income</span><p>{formatAmount($income)}</p></div>
  <div class="account-summary__expenses summary"><span>Expenses</span><p>{formatAmount(totalExpenses)}</p></div>
  <div class="account-summary__balance summary"><span>Balance</span><p>{formatAmount(Number($income) - totalExpenses)}</p></div>

</div>
<button class="reset" on:click={handleClearStorage}>clear data and reload app</button>
<Income></Income>
<NewField></NewField>
<table>
  <thead>
    <tr>
      <th>description</th>
      <th>value</th>
      <th>date</th>
    </tr>
  </thead>
  <tbody>
    {#if $expenses.length > 0}
      {#each $expenses as expense}
      <tr>
        <td>{expense.description}</td>
        <td>{formatAmount(expense.amount)}</td>
        <td>{formatDate(expense.expenseCreation)}</td>
      </tr>
      {/each}
    {:else}
      <tr>
      <td colspan="3">no data added yet</td>
    </tr>
    {/if}
  </tbody>
</table>
<div class="total-expenses">
  <span>total expenses</span>
  <span>{formatAmount(totalExpenses)}</span>
</div>
</section>

<style lang="scss">
  table, td, th {
    border: 1px solid;
    padding: 10px;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  .account-summary {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 100%;

    &__income {
      // width: 50%;
      background-color: #34b368;
    }

    &__expenses {
      // width: 50%;
      background-color: #fb7979;
    }

    &__balance {
      // width: 100%;
      background-color: #40bfff;
    }
  }

  .summary {
    padding: 25px 25px;
    color: #000000;
    position: relative;
    overflow: hidden;
    text-align: right;

    span {
      position: absolute;
      left: -5px;
      top: 5px;
      font-size: 70px;
      font-weight: 600;
      color: rgba(#000000, .2);
    }

    p {
      font-size: 20px;
    }
  }

  .reset {
    position: fixed;
    bottom: 0px;
    width: 100%;
    padding: 15px;
    font-size: 20px;
  }

</style>
