import { getallLions } from "./lions.js";

const searchButton = document.getElementById("search_btn");
const clearSearchButton = document.getElementById("clear_search_btn");
const searchInput = document.getElementById("search_input");
const sortCheckbox = document.getElementById("sort_checkbox");
const countButton = document.getElementById("count_btn");
const cardsContainer = document.getElementById("cards_container");
const cardTemplate = ({ id, name, description, price, weight }) => `
<li id="${id}" class="card">
  <img
    src="https://dictionary.cambridge.org/ru/images/thumb/lion_noun_002_21358.jpg?version=5.0.199"
    class="card__image" alt="card">
  <div>
    <h5>${name}</h5>
    <p>${description}</p>
    <p>Price: ${price} $.</p>
    <p>Weight: ${weight} kilograms.</p>
  </div>
</li>`;

let lions = [];

const addCardToPage = ({ _id: id, name, description, price, weight }) => {
  cardsContainer.insertAdjacentHTML(
    "afterbegin",
    cardTemplate({ id, name, description, price, weight })
  );
};

const renderCardsList = (cards) => {
  cardsContainer.innerHTML = "";
  for (const card of cards) {
    addCardToPage(card);
  }
}; 

const refetchalllions = () => {
  const allLions = getallLions();
  lions = allLions.sort((card1,card2) =>card2.name.localeCompare(card1.name));
  renderCardsList(lions);
};

searchButton.addEventListener("click", () => {
  const foundLions = lions.filter(
    (vase) => vase.name.search(searchInput.value) !== -1);
  renderCardsList(foundLions);
});

clearSearchButton.addEventListener("click", () => {
  renderCardsList(lions);
  searchInput.value = "";
});

sortCheckbox.addEventListener("change", function (e) {
    if (this.checked) {
        const sortedLions = lions.sort(
            (card1, card2) => parseFloat(card1.weight) - parseFloat(card2.weight));
        renderCardsList(sortedLions);
    }
    else {
        refetchalllions();
    }
});

countButton.addEventListener("click", () => {
    let sum = lions.map(o => o.price).reduce((a, c) => { return a + c });
    document.getElementById("total-price").innerText = sum;
    console.log(sum);
})

refetchalllions(); 