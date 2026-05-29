<script lang="ts">
    import NewAmount from './components/newAmount/NewAmount.svelte';
    import {amounts, amountsKey} from './store/amounts';
    import { formatDate } from './utils/dateFormatting';
    import { formatAmount } from './utils/amountFormatter';
    import bussiness from './assets/bag.svg';
    import reload from './assets/reload.svg';
    import amount from './assets/coin.svg';
    import arrow from './assets/arrow.svg';
    import remove from './assets/remove.svg';
    import edit from './assets/edit.svg';
    import AmountForm from './components/amountForm/AmountForm.svelte';
    import type { Amount } from './types/common';

    let disabled = true;
    let isPopupOpen = false;
    let isNewAmountPopupOpen = false;
    let isAmountFormPopupOpen = false;
    let isSummaryClosed = false;
    let activeTab = 'all';

    $: expenses = $amounts.filter(amount => amount.type === 'expense');
    $: incomes = $amounts.filter(amount => amount.type === 'income');

    $: items = $amounts.filter(amount => {
      if (activeTab === 'all') return amount;
      return amount.type === activeTab
    })

    $: totalExpenses = expenses.reduce((acc, {amount}) => {
      return acc += Number(amount);
    }, 0)
    
    $: totalIncomes = incomes.reduce((acc, {amount}) => {
      return acc += Number(amount);
    }, 0)

    const handleClearStorage = () => {
      localStorage.setItem('temporal_data', JSON.stringify($amounts));
      localStorage.removeItem(amountsKey);
      window.location.reload();
    }

    $: console.log('amounts', $amounts);
    $: console.log('expense.expenseCreation', $amounts[0]?.amountCreation);


    const handlePopup = () => {
      isPopupOpen = !isPopupOpen;
    }
    
    const handleOpenNewAmount = () => {
      isNewAmountPopupOpen = true;
    }
    
    const handleToggleSummary = () => {
      isSummaryClosed = !isSummaryClosed;
    }

    const handleActiveTab = (e: any) => {
      const value = e.target.value;

      switch(value) {
        case 'all':
          activeTab = value;
          break;
        case 'expense':
          activeTab = value;
          break;
        case 'income':
          activeTab = value;
          break;
      }
    }

    const handleRemoveItem = (id: string) => {
      const filteredAmounts = $amounts.filter(item => item.id !== id);
      amounts.set(filteredAmounts);
    }

    let itemToEdit: Amount = {description: '', amount: '', amountCreation: '', type: '', id: ''};

    const handleEditItem = (id: string) => {
      isAmountFormPopupOpen = true;
      itemToEdit = $amounts.find(item => item.id === id) || {description: '', amount: '', amountCreation: '', type: '', id: ''};
      console.log('itemToEdit', itemToEdit);
    }

</script>

{#if isNewAmountPopupOpen}
<div class="new-amount-popup">
  <div class="new-amount-popup__content">
    <NewAmount bind:isNewAmountPopupOpen={isNewAmountPopupOpen}></NewAmount>
  </div>
</div>
{/if}

{#if isAmountFormPopupOpen}
<div class="new-amount-popup">
  <div class="new-amount-popup__content">
    <AmountForm bind:isAmountFormPopupOpen={isAmountFormPopupOpen} itemToEdit={itemToEdit}></AmountForm>
  </div>
</div>
{/if}

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
<section class="finance-app">
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
    <span>reset</span></button>
  <button class="add-amount nav__item" on:click={handleOpenNewAmount}><img src={amount} alt="my bussiness"/><span>amount</span></button>
  <button disabled class:button-disabled={disabled} class="my-bussiness nav__item" on:click={handleClearStorage}><img src={bussiness} alt="my bussiness"/><span>bussiness</span></button>
</nav>
<div class="summary-history">
  <div class="summary-history__tabs">
    <button value="all" class:isActive={activeTab === 'all'} on:click={handleActiveTab}>All</button>
    <button value="expense" class:isActive={activeTab === 'expense'} on:click={handleActiveTab}>Expenses</button>
    <button value="income" class:isActive={activeTab === 'income'} on:click={handleActiveTab}>Incomes</button>
  </div>
  <ul class="summary-history__items">
   {#if items.length > 0}
      {#each items as item}
        <li class={`summary-history__item summary-history__item--${item.type === 'expense' ? 'expense': 'income'}`}>
          <span class={`summary-history__item-title summary-history__item-title--${item.type === 'expense' ? 'expense': 'income'}`}>{item.description}</span>
          <div class="summary-history__item-data">
            <span class="summary-history__item-data-amount">{formatAmount(item.amount)}</span>
            <span class="summary-history__item-data-date">{formatDate(item.amountCreation)}</span>
          </div>
          <div class="summary-history__item-icons">
            <button class="summary-history__item-icons-icon summary-history__item-icons-edit" on:click={() => handleEditItem(item.id)}><img src={edit} alt="edit field"/></button>
            <button class="summary-history__item-icons-icon summary-history__item-icons-remove" on:click={() => handleRemoveItem(item.id)}><img src={remove} alt="remove field"/></button>
          </div>
        </li>
      {/each}
    {:else} 
    <p style="margin: 15px 0px;">no data added yet</p>
    {/if}
  </ul>
</div>
<!-- <div class="total-expenses">
  <span>total expenses</span>
  <span>{formatAmount(totalExpenses)}</span>
</div> -->
</section>

<style lang="scss">

  .summary-history {
    width: 100%;
    background-color: #e8e8e8;
    max-height: 320px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    &__tabs {
      margin: 15px 0;

      button {
        min-width: 90px;
        padding: 10px 15px;
        border-radius: 20px;
        background: #ffffff;
        border: 1px solid #9fa1a2;
        font-size: 15px;
        color: #666666;
      }

      button.isActive {
        background-color: #8c8c8c;
        color: #ffffff;
      }
    }
    
    &__items{
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      padding: 0;
      align-items: center;
      width: 100%;
      overflow-y: scroll;
    }

    &__item {
      list-style: none;
      background-color: #ffffff;
      width: 90%;
      padding: 0 10px;
      border-radius: 15px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 15px;
      position: relative;

      &:after {
        content: '';
        position: absolute;
        width: 15px;
        height: 15px;
        right: 20px;
        border-radius: 20px;
        top: 9px;
      }

      &--income {
        &:after {
          background-color: #35b368;
        }
      }

      &--expense {
        &:after {
          background-color: #fb7979;
        }
      }
    }

    &__item-title {
      font-size: 16px;
      text-align: left;
      width: 100%;
      display: block;
      padding: 5px 10px;
      border-bottom: 1px solid #cccccc;
      text-transform: capitalize;
      font-weight: 800;
    }

    &__item-data {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 10px 0;
      padding-left: 10px;
      line-height: 20px;
    }

    &__item-data-amount {
      font-size: 18px;
    }

    &__item-data-date {
      font-size: 12px;
    }

    &__item-icons {
      display: flex;
      align-items: flex-start;
      margin: 10px 0;
      padding-right: 10px;
      line-height: 20px;
    }

    &__item-icons-icon {
      width: 35px;
      height: 35px;
      background: none;
      border: 1px solid #cccccc;
      border-radius: 20px;

      &:first-child {
        margin-right: 10px;
      }

      img {
        width: 100%;
      }
    }
  }

  .finance-app {
    padding: 5% 2%;
  }
  h3 {
    color: #ffffff;
    text-align: left;
    margin: 15px 0 5px;
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
    left: 0;

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

  .new-amount-popup {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 85%);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;

    &__content {
      width: 90%;
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
        color: #ffffff;
        text-transform: uppercase;
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
