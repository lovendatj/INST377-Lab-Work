document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector('.carousel');
    let images = ['image_1.jpg','image_2.jpg','image_3.jpg','image_4.jpg','image_5.jpg']
    load_images(images, carousel)
    const carousel_images = document.querySelectorAll('.carousel-image');
    update_carousel(carousel_images, 0);
    const previousButton = document.querySelector('.previous-button');
    const nextButton = document.querySelector('.next-button');
    let currentPosition = 0;

    // add click event to previous button
    previousButton.addEventListener('click', () => {
        previousButton.classList.add('active');
        nextButton.classList.remove('active');
        currentPosition--;
        if (currentPosition < 0) {
            currentPosition = images.length - 1;
        }
        update_carousel(carousel_images, currentPosition);
    });
    nextButton.addEventListener('click', () => {
        nextButton.classList.add('active');
        previousButton.classList.remove('active');
        currentPosition++;
        if (currentPosition > images.length - 1) {
            currentPosition = 0;
        }
        update_carousel(carousel_images, currentPosition);

    });
    

    /**
     * Update Carousel
     */
    function update_carousel (carousel_images, position) {
        // _log(`current position: ${position}`);
        carousel_images.forEach(image => {
            if (image.id == position) {
                image.style.display = 'block';
            } else {
                image.style.display = 'none';
            }
        });
    }

    /**
     * Load Images from Directory
     */
    function load_images (images, parent) {
        for (let i = 0; i < images.length; i++) {
            let img = document.createElement('img');
            img.src = './images/' + images[i];
            img.id = i;
            img.style = '';
            img.alt = `image_${i}`;
            img.classList.add('carousel-image');
            parent.appendChild(img);
        }
        
    }
    /**
     * Log Output
     */
    function _log (message) {
        console.log(message);
    }

});
