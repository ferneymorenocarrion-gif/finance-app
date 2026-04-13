<script>
    import NewField from './components/newField/NewField.svelte';
    import {expenses} from './store/expenses';
    import { formatDate } from './utils/dateFormatting';
    import { formatAmount } from './utils/amountFormatter';

    $: totalExpenses = $expenses.reduce((acc, expense) => {
      return acc += Number(expense.amount);
    }, 0)

    const handleClearStorage = () => {
      localStorage.clear();
    }

    $: console.log('expenses', $expenses);
    $: console.log('expense.expenseCreation', $expenses[0]?.expenseCreation);
</script>

<section id="center">
<button on:click={handleClearStorage}>clear storage data</button>
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
    width: 50%;
  }
</style>
