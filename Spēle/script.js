const symbols = ["A", "B", "C", "D"];
let cards = [...symbols, ...symbols];

cards.sort(() => Math.random() - 0.5);

const game = document.getElementById("game");

let firstCard = null;
let secondCard = null;
let lockBoard = false;

cards.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;

    card.addEventListener("click", () => flipCard(card));

    game.appendChild(card);
});

function flipCard(card) {

    if (lockBoard) return;
    if (card.classList.contains("open")) return;

    card.textContent = card.dataset.symbol;
    card.classList.add("open");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    checkMatch();
}

function checkMatch() {

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        resetBoard();

    } else {

        setTimeout(() => {
            firstCard.textContent = "";
            secondCard.textContent = "";

            firstCard.classList.remove("open");
            secondCard.classList.remove("open");

            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}