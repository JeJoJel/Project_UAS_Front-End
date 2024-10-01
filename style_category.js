const cards = document.querySelectorAll('.card');
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');
const cardsPerPage = 12;
let currentPage = 1;
let filteredCards = [...cards]; // Array untuk menyimpan hasil pencarian

// Fungsi untuk menampilkan halaman sesuai nomor halaman
function showPage(page, cardsToShow = filteredCards) {
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    // Sembunyikan semua card dan hanya tampilkan yang sesuai halaman
    cards.forEach(card => {
        card.style.display = 'none'; // Sembunyikan semua card awalnya
    });

    cardsToShow.slice(start, end).forEach(card => {
        card.style.display = 'block'; // Tampilkan card yang sesuai dengan halaman saat ini
    });

    const totalPages = Math.ceil(cardsToShow.length / cardsPerPage);
    document.getElementById('page-info').textContent = `${page} / ${totalPages}`;

    document.getElementById('prev-btn').disabled = page === 1;
    document.getElementById('next-btn').disabled = page === totalPages;
}

// Fungsi untuk mengupdate halaman ketika pencarian dilakukan
function searchCards() {
    const searchTerm = searchInput.value.toLowerCase();
    
    // Filter cards berdasarkan input pencarian pada judul (h3)
    filteredCards = [...cards].filter(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        return title.includes(searchTerm);
    });

    // Reset halaman ke 1 ketika pencarian dilakukan
    currentPage = 1;
    showPage(currentPage, filteredCards);
}

// Event listener untuk tombol search
searchButton.addEventListener('click', searchCards);

// Fungsi untuk navigasi ke halaman berikutnya
function nextPage() {
    currentPage++;
    showPage(currentPage, filteredCards);
}

// Fungsi untuk navigasi ke halaman sebelumnya
function prevPage() {
    currentPage--;
    showPage(currentPage, filteredCards);
}

// Tampilkan halaman pertama saat pertama kali halaman dimuat
showPage(currentPage);
