const filters = document.querySelector(".filters");
const container = document.querySelector(".container");
var selectedFilter = "all";

function fillCardTemplate(image, title, description, price) {
  return `
  <div class="card">
    <img class="card__image" src="${image}" alt="${title}" />
    <h2 class="card__title">${title}</h2>
    <h4 class="card__description">${description}</h4>
    <button class="card__button">$${price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}</button>
  </div>
  `;
}

function loadCards(cards, filterCategory) {
  container.innerHTML = "";
  const filteredCards =
    filterCategory === "all"
      ? cards
      : cards.filter((card) => card.category === filterCategory);
  for (const card of filteredCards) {
    container.insertAdjacentHTML(
      "beforeend",
      fillCardTemplate(card.image, card.title, card.description, card.price)
    );
  }
}

fetch("json/cards.json")
  .then((response) => response.json())
  .then((cards) => {
    document.querySelector("input[data-category='all']").checked = true;
    loadCards(cards, selectedFilter);
    for (const input of filters.querySelectorAll("input[type='radio']")) {
      input.addEventListener("change", () => {
        selectedFilter = input.getAttribute("data-category");
        loadCards(cards, selectedFilter);
      });
    }
  });
