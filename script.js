const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let turns = 0;

function createGameBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    // Duplicate emojis and shuffle
    const cardPairs = [...emojis, ...emojis];
    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);

    shuffledCards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    // Prevent flipping more than 2 cards, already matched or already flipped cards
    if (flippedCards.length >= 2 ||
        this.classList.contains('matched') ||
        this.classList.contains('flipped')) return;

    this.textContent = this.dataset.emoji;
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        turns++;
        document.getElementById('status').textContent = `Turns: ${turns}`;
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;

        if (matchedPairs === emojis.length) {
            alert(`Congratulations! You won in ${turns} turns!`);
        }
    } else {
        card1.textContent = '';
        card2.textContent = '';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = [];
}

function resetGame() {
    matchedPairs = 0;
    turns = 0;
    document.getElementById('status').textContent = 'Turns: 0';
    createGameBoard();
}

// Initialize the game
createGameBoard();
