const container = document.querySelector(".container");

async function getCards() {
  const path = "data/cards.json";
  const response = await fetch(path);
  if (response.ok) {
    console.log(await response.json());
  }
}

const cards = getCards();

const cardTemplate = (image, title, description, price) => {
  return `
  <div class="card">
    <img class="card__image" src="${image}" alt="${title}" />
    <h2 class="card__title">${title}</h2>
    <h4 class="card__description">${description}</h4>
    <button class="card__button">${price}</button>
  </div>
  `;
};

console.log(cards);

for (const card of cards) {
  container.insertAdjacentHTML("afterend", cardTemplate(card.image, card.title, card.description, card.price));
}