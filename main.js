// Sample game data (in a real application, this would come from a backend)
const games = [
    {
        id: 1,
        title: "Space Adventure",
        category: "action",
        thumbnail: "images/game1.jpg",
        rating: 4.5,
        isNew: true
    },
    // Add more games here
];

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-theme')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

// Search Functionality
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Create Game Cards
function createGameCard(game) {
    return `
        <div class="game-card">
            <img src="${game.thumbnail}" alt="${game.title}">
            <div class="game-info">
                <h3>${game.title}</h3>
                <div class="rating">
                    ${'★'.repeat(Math.floor(game.rating))}${game.rating % 1 >= 0.5 ? '½' : ''}
                    ${'☆'.repeat(5 - Math.ceil(game.rating))}
                </div>
                ${game.isNew ? '<span class="new-badge">New</span>' : ''}
            </div>
        </div>
    `;
}

// Populate Games
function populateGames() {
    const popularGamesContainer = document.getElementById('popularGames');
    const newGamesContainer = document.getElementById('newGames');

    const popularGames = games.sort((a, b) => b.rating - a.rating).slice(0, 8);
    const newGames = games.filter(game => game.isNew).slice(0, 8);

    popularGamesContainer.innerHTML = popularGames.map(createGameCard).join('');
    newGamesContainer.innerHTML = newGames.map(createGameCard).join('');
}

// Category Filter
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        const filteredGames = games.filter(game => game.category === category);
        const gamesContainer = document.getElementById('popularGames');
        gamesContainer.innerHTML = filteredGames.map(createGameCard).join('');
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateGames();
}); 