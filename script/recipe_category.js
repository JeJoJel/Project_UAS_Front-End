const cards = document.querySelectorAll('.card');
const searchInput = document.querySelector('.search-bar'); 
const searchIcon = document.querySelector('.search-icon'); 
let currentPage = 1;
let filteredCards = [...cards]; 

function showPage(page, cardsToShow = filteredCards) {
  const start = (page - 1) * cardsPerPage;
  const end = start + cardsPerPage;

  cards.forEach(card => {
    card.style.display = 'none';
  });

  cardsToShow.slice(start, end).forEach(card => {
    card.style.display = 'block';
  });

  const totalPages = Math.ceil(cardsToShow.length / cardsPerPage);
  document.getElementById('page-info').textContent = `${page} / ${totalPages}`;

  document.getElementById('prev-btn').disabled = page === 1;
  document.getElementById('next-btn').disabled = page === totalPages || cardsToShow.length === 0;
}

function searchCards() {
  const searchTerm = searchInput.value.toLowerCase();

  filteredCards = [...cards].filter(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    return title.includes(searchTerm);
  });

  const noResultsMessage = document.getElementById('no-results');

  if (filteredCards.length === 0) {
    noResultsMessage.textContent = 'Sorry, no content matched your criteria';
    noResultsMessage.style.display = 'block'; 

    cards.forEach(card => {
      card.style.display = 'none';
    });

    document.getElementById('prev-btn').disabled = true;
    document.getElementById('next-btn').disabled = true;
  } else {
    noResultsMessage.textContent = ''; 
    noResultsMessage.style.display = 'none';

    currentPage = 1; 
    showPage(currentPage);
  }
}

searchIcon.addEventListener('click', searchCards); 

searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    searchCards(); 
  }
});

function nextPage() {
  if (currentPage < Math.ceil(filteredCards.length / cardsPerPage)) {
    currentPage++;
    showPage(currentPage);
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    showPage(currentPage);
  }
}

showPage(currentPage);
