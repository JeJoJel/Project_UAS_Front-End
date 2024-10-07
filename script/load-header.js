document.addEventListener('DOMContentLoaded', () => {
    // Load header.html and inject it into the header-container
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
});