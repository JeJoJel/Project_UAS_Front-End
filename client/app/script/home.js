let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex - 1].style.display = "block";  
    setTimeout(showSlides, 10000);
}

let currentIndex = 0;


function authentication () {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/client/app/views/login.html"; // Redirect jika tidak login
        }
};