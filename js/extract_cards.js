// Automatically extract all the hardcoded cards because I'm too lazy to type it all out myself

const container = document.querySelector(".container");
let arr = [];

for (const card of container.children) {
  arr.push({
    image: card.querySelector(".card__image").getAttribute("src"),
    title: card
      .querySelector(".card__title")
      .textContent.replaceAll("\n", "")
      .trim(),
    description: card
      .querySelector(".card__description")
      .textContent.replaceAll("\n", "")
      .trim(),
    price: card
      .querySelector(".card__button")
      .textContent.replaceAll("\n", "")
      .trim(),
  });
}

console.log(arr);
