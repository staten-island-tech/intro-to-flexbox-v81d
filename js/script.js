document.addEventListener("mousedown", (e) => e.preventDefault());

const cartButton = document.getElementById("cart-button");
const cartShowButton = cartButton.querySelector("#cart-show-button");
const cartCloseButton = cartButton.querySelector("#cart-close-button");
const overlayCartContainer = document.querySelector(".overlay-cart-container");
const cartEmptyAlert = overlayCartContainer.querySelector(".overlay-cart-container__empty-alert");
const cartItemsList = document.getElementById("cart-items-list");
const filters = document.querySelector(".filters");
const container = document.querySelector(".container");
var selectedFilter = "all";
var cartOpen = false;
var cart = [];

function fillCardTemplate(image, title, description, price, id) {
  return `
  <div class="card">
    <img class="card__image" src="${image}" alt="${title}" />
    <h2 class="card__title">${title}</h2>
    <h4 class="card__description">${description}</h4>
    <button class="card__button" title="Add to Cart" data-id="${id}">$${price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}</button>
  </div>
  `;
}

function fillCartItemTemplate(title, price, strong) {
  price = "$" + price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (strong) {
    title = `<strong>${title}</strong>`;
    price = `<strong>${price}</strong>`;
  }

  return `
  <tr>
    <td>${title}</td>
    <td>${price}</td>
  </tr>
  `
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
      fillCardTemplate(card.image, card.title, card.description, card.price, card.id)
    );
  }

  addClickEvents(cards);
}

function loadCart() {
  cartItemsList.innerHTML = "";
  totalPrice = 0;

  for (const card of cart) {
    cartItemsList.insertAdjacentHTML(
      "beforeend",
      fillCartItemTemplate(card.title, card.price, false)
    );
    totalPrice += card.price;
  }

  if (totalPrice != 0) {
    cartItemsList.insertAdjacentHTML(
      "beforeend",
      fillCartItemTemplate("Total", totalPrice, true)
    );
  }
}

function addClickEvents(cards) {
  for (const card of container.children) {
    const buyButton = card.querySelector(".card__button");
    const cardID = buyButton.getAttribute("data-id");
    const price = buyButton.textContent;

    buyButton.addEventListener("click", (_) => {
      cart.push(cards[cardID]);
      buyButton.textContent = "Added to Cart!";
      window.setTimeout(() => buyButton.textContent = price, 2000);
    });
  }
}

fetch("json/cards.json")
  .then((response) => response.json())
  .then((cards) => {
    document.querySelector("input[data-category='all']").checked = true;

    for (let i = 0; i < cards.length; ++i) cards[i].id = i;
    loadCards(cards, selectedFilter);

    for (const input of filters.querySelectorAll("input[type='radio']")) {
      input.addEventListener("change", () => {
        selectedFilter = input.getAttribute("data-category");
        loadCards(cards, selectedFilter);
      });
    }
  });

cartButton.addEventListener("click", (_) => {
  cartOpen = !cartOpen;
  if (cartOpen) {
    cartShowButton.style.display = "none";
    cartCloseButton.style.display = "block";
    overlayCartContainer.style.height = "100%";

    document.body.style.overflow = "hidden";
    document.body.style.userSelect = "none";

    if (cart.length > 0) cartEmptyAlert.style.display = "none";
    else cartEmptyAlert.style.display = "block";

    loadCart();
  } else {
    cartShowButton.style.display = "block";
    cartCloseButton.style.display = "none";
    overlayCartContainer.style.height = "0";

    document.body.style.overflow = "scroll";
    document.body.style.userSelect = "text";
  }
});

this.addEventListener("keyup", (event) => {
  if (event.key === "Escape" && cartOpen) {
    cartShowButton.style.display = "block";
    cartCloseButton.style.display = "none";
    overlayCartContainer.style.height = "0";

    document.body.style.overflow = "scroll";
    document.body.style.userSelect = "text";

    cartOpen = false;
  }
});
