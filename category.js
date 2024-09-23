// Ambil semua elemen card
const cards = document.querySelectorAll('.card');
const cardsPerPage = 12;
let currentPage = 1;

function showPage(page) {
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    // Sembunyikan semua card dan hanya tampilkan yang sesuai halaman
    cards.forEach((card, index) => {
        if (index >= start && index < end) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // Update informasi halaman
    const totalPages = Math.ceil(cards.length / cardsPerPage);
    document.getElementById('page-info').textContent = `Page ${page} of ${totalPages}`;

    // Cek jika halaman pertama atau terakhir
    document.getElementById('prev-btn').disabled = page === 1;
    document.getElementById('next-btn').disabled = page === totalPages;
}

// Fungsi untuk 'Next'
function nextPage() {
    currentPage++;
    showPage(currentPage);
}

// Fungsi untuk 'Previous'
function prevPage() {
    currentPage--;
    showPage(currentPage);
}

// Tampilkan halaman pertama saat load
showPage(currentPage);
