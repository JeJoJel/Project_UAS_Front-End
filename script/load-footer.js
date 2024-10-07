document.addEventListener('DOMContentLoaded', () => {
    // Load footer.html and inject it into the footer-container
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});