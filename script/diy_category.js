const cards = document.querySelectorAll('.card');
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');
const cardsPerPage = 12;
let currentPage = 1;
let filteredCards = [...cards]; // Array to store search results

// Function to display cards for a specific page
function showPage(page, cardsToShow = filteredCards) {
  const start = (page - 1) * cardsPerPage;
  const end = start + cardsPerPage;

  // Hide all cards and display only the ones for the current page
  cards.forEach(card => {
    card.style.display = 'none';
  });

  cardsToShow.slice(start, end).forEach(card => {
    card.style.display = 'block';
  });

  const totalPages = Math.ceil(cardsToShow.length / cardsPerPage);
  document.getElementById('page-info').textContent = `${page} / ${totalPages}`;

  document.getElementById('prev-btn').disabled = page === 1;
  document.getElementById('next-btn').disabled = page === totalPages;
}

// Function to update and display search results
function searchCards() {
    const searchTerm = searchInput.value.toLowerCase();
  
    // Filter cards based on search term in title (h3)
    filteredCards = [...cards].filter(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      return title.includes(searchTerm);
    });
  
    // Check if any results match the search criteria
    if (filteredCards.length === 0) {
      const noResultsMessage = document.getElementById('no-results');
      noResultsMessage.textContent = 'Sorry, no content matched your criteria';
      noResultsMessage.style.display = 'block'; // Display "no results" message
  
      // Hide all cards since there are no search results
      cards.forEach(card => {
        card.style.display = 'none';
      });
  
      // Disable pagination buttons if no results
      document.getElementById('prev-btn').disabled = true;
      document.getElementById('next-btn').disabled = true;
    } else {
      // Display search results (already handled in "showPage")
      const noResultsMessage = document.getElementById('no-results');
      noResultsMessage.textContent = ''; // Hide "no results" message
      noResultsMessage.style.display = 'none';
  
      // Reset pagination and display first page
      currentPage = 1;
      showPage(currentPage);
    }
}

  

searchButton.addEventListener('click', searchCards);

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

