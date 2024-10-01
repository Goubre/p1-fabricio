const dogList = document.getElementById('dog-list');
const favoritesElement = document.getElementById('favorites');
const breedSelect = document.getElementById('breed-select');
const fetchButton = document.getElementById('fetch-dog');

let favorites = [];

// Adiciona evento ao botão de buscar cachorro
fetchButton.addEventListener('click', fetchDog);

function fetchDog() {
    // Remove todos os cachorros exibidos anteriormente
    dogList.innerHTML = '';

    // Obtém a raça selecionada
    const breed = breedSelect.value;
    
    // Define a URL para buscar o cachorro baseado na raça escolhida
    const url = breed ? `https://dog.ceo/api/breed/${breed}/images/random` : 'https://dog.ceo/api/breeds/image/random';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Cria um elemento para o cachorro
            const dogItem = document.createElement('div');
            dogItem.className = 'dog-item';
            dogItem.innerHTML = `
                <img src="${data.message}" alt="Cachorro">
                <button onclick="addToFavorites('${data.message}')">Adicionar aos Favoritos</button>
            `;
            dogList.appendChild(dogItem);
        })
        .catch(error => {
            console.error('Erro ao buscar cachorro:', error);
        });
}

// Função para adicionar aos favoritos
function addToFavorites(url) {
    if (!favorites.includes(url)) {
        favorites.push(url);
        updateFavoritesDisplay();
    }
}

// Função para atualizar a lista de favoritos
function updateFavoritesDisplay() {
    favoritesElement.innerHTML = '<h2>Favoritos</h2>';
    if (favorites.length === 0) {
        favoritesElement.innerHTML += '<p class="empty">Nenhum favorito adicionado.</p>';
    } else {
        favorites.forEach(url => {
            const favoriteItem = document.createElement('div');
            favoriteItem.className = 'favorite-item';
            favoriteItem.innerHTML = `
                <img src="${url}" alt="Cachorro Favorito">
                <button onclick="removeFromFavorites('${url}')">Remover</button>
            `;
            favoritesElement.appendChild(favoriteItem);
        });
    }
}

// Função para remover favoritos
function removeFromFavorites(url) {
    favorites = favorites.filter(fav => fav !== url);
    updateFavoritesDisplay();
}
