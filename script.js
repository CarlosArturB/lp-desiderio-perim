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

// Inicializar EmailJS
document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("p2108Zdhe0z50WVZG");

  function mostrarToast(texto, cor) {
    Toastify({
      text: texto,
      duration: 3000,
      close: true,
      gravity: "top", // top ou bottom
      position: "right", // left, center ou right
      backgroundColor: cor,
      stopOnFocus: true,
    }).showToast();
  }

  function enviarFormulario(nome, email, telefone) {
    const templateParams = { nome, email, telefone };

    emailjs
      .send("service_b7eyued", "template_4cnm8ts", templateParams)
      .then(
        function (response) {
          mostrarToast("Mensagem enviada com sucesso!", "linear-gradient(to right, #00b09b, #96c93d)");
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          mostrarToast("Erro ao enviar. Tente novamente.", "linear-gradient(to right, #ff5f6d, #ffc371)");
          console.error("FAILED...", error);
        }
      );
  }

  const formDesktop = document.getElementById("formdesktop");
  if (formDesktop) {
    formDesktop.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = formDesktop.querySelector("#nome").value.trim();
      const email = formDesktop.querySelector("#email").value.trim();
      const telefone = formDesktop.querySelector("#telefone").value.trim();

      if (nome && email && telefone) {
        enviarFormulario(nome, email, telefone);
        formDesktop.reset();
      } else {
        mostrarToast("Por favor, preencha todos os campos.", "linear-gradient(to right, #ff5f6d, #ffc371)");
      }
    });
  }

  const formMobile = document.querySelector(".formulario-mobile");
  if (formMobile) {
    formMobile.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = formMobile.querySelector("#nome").value.trim();
      const email = formMobile.querySelector("#email").value.trim();
      const telefone = formMobile.querySelector("#telefone").value.trim();

      if (nome && email && telefone) {
        enviarFormulario(nome, email, telefone);
        formMobile.reset();
      } else {
        mostrarToast("Por favor, preencha todos os campos.", "linear-gradient(to right, #ff5f6d, #ffc371)");
      }
    });
  }
});





