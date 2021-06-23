import {
  getAutocompliteInstance, 
  getDatePickerInstance
} from '../plugins/materialize';

class FormUI {
  constructor(autocompliteInstance, datePickerInstance){
    this._form = document.forms['locationControls'];
    this.origin = document.getElementById('autocomplete-origin');
    this.destination = document.getElementById('autocomplete-destination');
    this.depart = document.getElementById('datepicker-depart');
    this.return = document.getElementById('datepicker-return');
    this.originAutocomplete = autocompliteInstance(this.origin);
    this.destinationAutocomplete = autocompliteInstance(this.destination);
    this.departDatePicker = datePickerInstance(this.depart);
    this.returnDatePicker = datePickerInstance(this.return);
  }

  get form() {
    return this._form;
  }

  get originValue(){
    return this.origin.value;
  }

  get destinationValue(){
    return this.destination.value;
  }

  get departDateValue(){
    return this.departDatePicker.toString();
  }

  get returnDateValue(){
    return this.returnDatePicker.toString();
  }

  setAutocompleteData(data){
    this.originAutocomplete.updateData(data);
    this.destinationAutocomplete.updateData(data);
  }
}

const formUI = new FormUI(getAutocompliteInstance, getDatePickerInstance);

export default formUI;
