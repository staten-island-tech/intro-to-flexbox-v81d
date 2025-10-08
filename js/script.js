const filters = document.querySelector(".filters");
const container = document.querySelector(".container");
var selectedFilter = "All";

function fillCardTemplate(image, title, description, price) {
  return `
  <div class="card">
    <img class="card__image" src="${image}" alt="${title}" />
    <h2 class="card__title">${title}</h2>
    <h4 class="card__description">${description}</h4>
    <button class="card__button">$${price.toLocaleString("en-US")}</button>
  </div>
  `;
}

function loadCards(cards) {
  for (const card of cards) {
    container.insertAdjacentHTML(
      "beforeend",
      fillCardTemplate(card.image, card.title, card.description, card.price)
    );
  }
}

function selectFilter(filter) {}

fetch("json/cards.json")
  .then((response) => response.json())
  .then((cards) => {
    loadCards(cards);
  });
