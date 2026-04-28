<script>
    import NewAmount from './components/newAmount/NewAmount.svelte';
    import {amounts} from './store/amounts';
    import {income} from './store/income';
    import { formatDate } from './utils/dateFormatting';
    import { formatAmount } from './utils/amountFormatter';
    // import Income from './components/income/Income.svelte';
    import bussiness from './assets/bag.svg';
    import reload from './assets/reload.svg';
    import amount from './assets/coin.svg';
    import arrow from './assets/arrow.svg';

    let disabled = true;
    let isPopupOpen = false;
    let isSummaryClosed = false;

    $: expenses = $amounts.filter(amount => amount.type === 'expense');
    $: incomes = $amounts.filter(amount => amount.type === 'income');

    $: totalExpenses = expenses.reduce((acc, {amount}) => {
      return acc += Number(amount);
    }, 0)
    
    $: totalIncomes = incomes.reduce((acc, {amount}) => {
      return acc += Number(amount);
    }, 0)

    const handleClearStorage = () => {
      localStorage.clear();
      window.location.reload();
    }

    $: console.log('amounts', $amounts);
    $: console.log('expense.expenseCreation', $amounts[0]?.amountCreation);


    const handlePopup = () => {
      isPopupOpen = !isPopupOpen;
    }
    
    const handleToggleSummary = () => {
      isSummaryClosed = !isSummaryClosed;
    }
</script>

{#if isPopupOpen}
  <div class="reset-app-popup">
  <div class="reset-app-popup__content">
    <h4>Are you sure to reset the app?</h4>
    <span>This action will delete your current information</span>
    <div class="reset-app-popup__actions">
      <button class="reset-app-popup__cancel" on:click={handlePopup}>cancel</button>
      <button class="reset-app-popup__confirm" on:click={handleClearStorage}>confirm</button>
    </div>
  </div>
</div>
{/if}
<section id="center">
<div class="account-summary" class:toggle-summary={isSummaryClosed}>
  <button on:click={handleToggleSummary}>{isSummaryClosed ? 'show amounts' : 'hide amounts'}
    <img src={arrow} alt="reload app"/>
  </button>
  <div class="account-summary__income summary"><span>Income</span><p>{formatAmount(totalIncomes)}</p></div>
  <div class="account-summary__expenses summary"><span>Expenses</span><p>{formatAmount(totalExpenses)}</p></div>
  <div class="account-summary__balance summary"><span>Balance</span><p>{formatAmount(Number(totalIncomes) - totalExpenses)}</p></div>
</div>
<nav class="nav">
  <button class="reload nav__item" on:click={handlePopup}>
    <img src={reload} alt="reload app"/>
    <span>reload</span></button>
  <button disabled class:button-disabled={disabled} class="add-amount nav__item" on:click={handleClearStorage}><img src={amount} alt="my bussiness"/><span>amount</span></button>
  <button disabled class:button-disabled={disabled} class="my-bussiness nav__item" on:click={handleClearStorage}><img src={bussiness} alt="my bussiness"/><span>bussiness</span></button>
</nav>
<!-- <Income></Income> -->
<NewAmount></NewAmount>
<table class="expenses">
  <thead>
    <tr>
      <th>description</th>
      <th>value</th>
      <th>date</th>
    </tr>
  </thead>
  <tbody>
    {#if expenses.length > 0}
      {#each expenses as expense}
      <tr>
        <td>{expense.description}</td>
        <td>{formatAmount(expense.amount)}</td>
        <td>{formatDate(expense.amountCreation)}</td>
      </tr>
      {/each}
    {:else}
      <tr>
      <td colspan="3">no data added yet</td>
    </tr>
    {/if}
  </tbody>
</table>
<table class="incomes">
  <thead>
    <tr>
      <th>description</th>
      <th>value</th>
      <th>date</th>
    </tr>
  </thead>
  <tbody>
    {#if incomes.length > 0}
      {#each incomes as income}
      <tr>
        <td>{income.description}</td>
        <td>{formatAmount(income.amount)}</td>
        <td>{formatDate(income.amountCreation)}</td>
      </tr>
      {/each}
    {:else}
      <tr>
      <td colspan="3">no data added yet</td>
    </tr>
    {/if}
  </tbody>
</table>
<!-- <div class="total-expenses">
  <span>total expenses</span>
  <span>{formatAmount(totalExpenses)}</span>
</div> -->
</section>

<style lang="scss">
  table, td, th {
    border: 1px solid;
    padding: 10px;
  }

  th {
    text-transform: capitalize;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    color: #3c4143;
  }

  .expenses {
    background-color: #fdbbdb;
    border-color: red;
  }
  
  .incomes {
    background-color: #9bdab4;
  }

  .account-summary {
    position: fixed;
    bottom: 86px;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    z-index: 1;
    transition: bottom 0.4s linear;

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

    button {
      font-size: 15px;
      text-transform: capitalize;
      padding: 5px 0 5px 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #e8e8e8;
      border: 0;
      color: #000;

      img {
        height: 40px;
      }
    }
  }

  .toggle-summary {
    bottom: -134px;

    button {
      img {
        transform: rotate(180deg);
      }
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

  .nav {
    position: fixed;
    width: 100%;
    display: flex;
    bottom: 0;
    background-color: #e8e8e8;
    z-index: 1;
    border-top: 1px solid #777a7c;

    .reload {
      width: 25%;
    }
    
    &__item {
      padding: 10px;
      width: calc(75% / 2);
      display: flex;
      flex-direction: column;
      border: 0px;
      background: none;
      border-right: 1px solid #777a7c;
      
      img {
        height: 45px;
      }
      
      span {
        color: #000000;
        font-size: 18px;
      }
    }

    .button-disabled {
      opacity: 0.3;
    }
  }

  .reset-app-popup {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 85%);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;

    &__content {
      width: 80%;
      background-color: #ffffff;
      padding: 30px 10px;

      h4 {
        margin: 0 0 5px;
      }
    }

    &__actions {
      margin-top: 20px;
      display: flex;
      justify-content: space-evenly;
      
      button {
        border: 0px;
        padding: 10px 30px;
        font-size: 15px;
      }
    }

    &__cancel {
      background-color: #9fa1a2;
    }

    &__confirm {
      background-color: #0ba449;
    }
  }

</style>
