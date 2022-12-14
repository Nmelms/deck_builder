let cardsList = document.querySelector(".cardsList");
let switchBtn = document.querySelector(".switchBtn");
let deckLink = document.querySelector(".deckLink");
let searchLink = document.querySelector(".searchLink");
let select = document.querySelector(".select");
let cardTypeCheckBox = document.querySelector(".cardTypeCheckBox");
let advancedSearchBtn = document.querySelector(".advancedSearchBtn");
let cardType = [...document.querySelectorAll(".cardType")];
let colorType = [...document.querySelectorAll(".colorType")];
let formatRadio = [...document.querySelectorAll(".formatRadio")];
let cards = null;
let pageNumber = localStorage.getItem("page");
let queryString = "q=";
import { fetchCards } from "/scripts/data.js";

if (localStorage.getItem("deckArr") === null) {
  localStorage.setItem("deckArr", JSON.stringify([]));
}

const showCards = () => {
  window.addEventListener("load", () => {});
  for (let i = 0; i < cards.length; i++) {
    let img = document.createElement("img");
    img.src = cards[i].imageUrl;
    cardsList.appendChild(img);
  }
};

advancedSearchBtn.addEventListener("click", () => {
  advancedSearchBtn.innerHTML = `
  <div style="height: 1.5rem; width: 1.5rem;" class="spinner-border" role="status">
    <span class="sr-only"></span>
  </div>`;
  let string = "q=";
  let checkedValues = [];
  cardType.map((item, index) => {
    if (item.checked) {
      checkedValues.push(item.value);
    }
  });
  checkedValues.map((value, index) => {
    if (index !== checkedValues.length - 1) {
      string += value + " OR ";
    } else if (index === checkedValues.length - 1) {
      string += value;
    }
    queryString = string;
  });

  formatRadio.map((item) => {
    if (item.checked) {
      queryString += item.value;
    }
  });
  let colorString = " c:";
  colorType.map((item) => {
    if (item.checked) {
      colorString += item.value;
    }
  });
  queryString += colorString;

  setTimeout(() => {
    fetchCards(
      `https://api.scryfall.com/cards/search?order=color&${queryString}&page=1`
    );
  }, 2000);
});

select.addEventListener("change", (e) => {
  localStorage.setItem("queryString", e.target.value);
  localStorage.setItem("page", "1");
  fetchCards(
    `https://api.scryfall.com/cards/search?limit=50&order=cmc&q=` +
      e.target.value +
      "&page=1"
  );
});
