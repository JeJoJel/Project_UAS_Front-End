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

function moveSlide(direction) {
    const slides = document.querySelectorAll('.box');
    const totalSlides = slides.length;
    const slidesToShow = 5; // Number of slides to show at a time

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = Math.floor(totalSlides / slidesToShow) * slidesToShow - 1; // Go to the last set of images
    } else if (currentIndex >= totalSlides / slidesToShow) {
        currentIndex = 0; // Loop to the first set of images
    }

    const offset = -currentIndex * (100 / slidesToShow); // Calculate the offset
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
}
