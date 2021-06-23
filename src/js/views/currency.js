class CurrensyUI {
  constructor(){
    this.currency = document.getElementById('currency');
    this.dictionary = {
      USD: '$',
      EUR: '€',
    }
  }

  get currencyValue(){
    return this.currency.value;
  }

  getCurrencySymbol(){
    return this.dictionary[this.currencyValue];
  }
}

const currensyUI = new CurrensyUI();

export default currensyUI;
