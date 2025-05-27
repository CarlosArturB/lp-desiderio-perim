const slides = document.querySelectorAll('.foto1-formulario-mobile .slide');
let currentIndex = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

// Mostrar o primeiro slide
showSlide(currentIndex);

// Trocar de slide a cada 40 segundos (40000 ms)
setInterval(nextSlide, 5000);


