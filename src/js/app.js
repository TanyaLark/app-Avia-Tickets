import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currensyUI from './views/currency';
import favoriteTicketsUI from './views/favoriteTicket';

document.addEventListener('DOMContentLoaded', () => {
  const form = formUI.form;

  //Events
  initApp();
  form.addEventListener('submit', (e) => {
    e.preventDefault(); //Чтобы форма не перезагружала страницу
    onFormSubmit();
  });

  const btnFavorites = document.querySelector('.favorites .dropdown-trigger');
  btnFavorites.addEventListener('click', e => {
    favoriteTicketsUI.setFavoriteContainerHeight(locations.favoriteAirlines);
    favoriteTicketsUI.renderTickets(locations.favoriteAirlines);
  });

  //Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currensyUI.currencyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);

    const btnsAddFavorite = document.querySelectorAll('.add-favorite');

    [...btnsAddFavorite].forEach(btn => {
      btn.addEventListener('click', () => {
        const ticketCard = btn.parentElement;
        let timeDeparture = ticketCard.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.textContent;
        locations.getFavoriteAirlines(locations.lastSearch, timeDeparture);
      });
    });

  }
});





// *1 - создать отдельный метод для получения airlines
// *2 - в init добавить получение airlines
// *3 - serializeAirlines
// *4 - serializeTickets и переделать serializeCities и createShortCities и getCityCodeByKey
// *5 - новые методы getAirlineNameByCode, getAirlineLogoByCode, getCityNameByCode
// *6 - TicketsUI

