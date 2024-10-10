let currentImage = 1;
const totalImages = 4;
const images = ['../img/contact/person1.jpg', '../img/contact/person2.jpg', '../img/contact/person3.jpg', '../img/contact/person4.jpg'];

function showImage(imageNumber) {
    currentImage = imageNumber;
    const sliderImage = document.getElementById('slider-image');
    sliderImage.src = images[imageNumber - 1];

    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        if (index === imageNumber - 1) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });
}

showImage(1);