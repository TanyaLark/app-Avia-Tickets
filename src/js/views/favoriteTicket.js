import currensyUI from './currency';
import locations from '../store/locations';

class FavoriteTicketsUI {
  constructor(currensy) {
    this.container = document.querySelector('.favorites .dropdown-content');
    this.currencySymbol = currensy.getCurrencySymbol.bind(currensy);
  }

  deleteFavoriteAirline(delBtn, favoriteAirlines){
    let timeDeparture = delBtn.parentElement.firstElementChild.nextElementSibling.firstElementChild.textContent;
    let favoriteTicketObj;

    locations.favoriteAirlines.forEach(element => {
      if (timeDeparture === element.departure_at) {
        favoriteTicketObj = element;
      }
    });

    const index = locations.favoriteAirlines.findIndex(el => {
      return JSON.stringify(el) === JSON.stringify(favoriteTicketObj);
    });
    
    locations.favoriteAirlines.splice(index, 1);
    this.renderTickets(favoriteAirlines)
    
  }

  setFavoriteContainerHeight(favoriteAirlines){
    if (favoriteAirlines.length === 0 || favoriteAirlines.length === 1){

      this.container.style.setProperty("--box-height", "132px");
      
    } else if (favoriteAirlines.length === 2){

      this.container.style.setProperty("--box-height", "264px");

    } else if (favoriteAirlines.length >= 3){

      this.container.style.setProperty("--box-height", "396px");
     
    }
  }

  renderTickets(tickets) {
    // this.clearContainer();
    let fragment = '';
    if (tickets.length !== 0){
      this.clearContainer();
      const currency = this.currencySymbol();
      tickets.forEach(ticket => {
        const template = FavoriteTicketsUI.ticketTemplate(ticket, currency);
        fragment += template;
      });
    } else {
      const template = ' <div class="select-message"> Please, select your favorite tickets.</div> ';
      fragment += template; 
      this.clearContainer();
    }

   this.container.insertAdjacentHTML('afterbegin', fragment);
   
   this.delBtnEvents();
  }

  delBtnEvents(){
    const delBtns = [...(document.querySelectorAll('.delete-favorite'))];
    delBtns?.map((el) => {
      el.addEventListener('click', (e) => {
        favoriteTicketsUI.deleteFavoriteAirline(el, locations.favoriteAirlines);
      });
    })
  }

  clearContainer() {
    this.container.innerHTML = '';
  }

  static ticketTemplate(ticket, currency) {
    return `
    <div class="favorite-item d-flex align-items-start">
    <img src="${ticket.airline_logo}" class="favorite-item-airline-img" />
    <div class="favorite-item-info d-flex flex-column">
      <div class="favorite-item-destination d-flex align-items-center">
        <div class="d-flex align-items-center mr-auto">
          <span class="favorite-item-city">${ticket.origin_name}</span>
          <i class="medium material-icons">flight_takeoff</i>
        </div>
        <div class="d-flex align-items-center">
          <i class="medium material-icons">flight_land</i>
          <span class="favorite-item-city">${ticket.destination_name}</span>
        </div>
      </div>
      <div class="ticket-time-price d-flex align-items-center">
        <span class="ticket-time-departure">${ticket.departure_at}</span>
        <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
      </div>
      <div class="ticket-additional-info">
        <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
        <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
      </div>
      <a class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto">Delete</a>
    </div>
  </div>
  `;
  }
}

const favoriteTicketsUI = new FavoriteTicketsUI(currensyUI);

export default favoriteTicketsUI;
