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

  function enviarFormulario(nome, email, telefone) {
    const templateParams = { nome, email, telefone };
    console.log("Enviando templateParams:", templateParams);

    emailjs
      .send("service_b7eyued", "template_4cnm8ts", templateParams)
      .then(
        function (response) {
          alert("Mensagem enviada com sucesso!");
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          alert("Erro ao enviar. Tente novamente.");
          console.error("FAILED...", error);
        }
      );
  }

  // Seleciona o formulário desktop pelo id
  const formDesktop = document.getElementById("formdesktop");
  console.log("Form desktop encontrado?", formDesktop);
  if (formDesktop) {
    formDesktop.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = formDesktop.querySelector("#nome").value.trim();
      const email = formDesktop.querySelector("#email").value.trim();
      const telefone = formDesktop.querySelector("#telefone").value.trim();

      console.log("Dados do formulário desktop:", { nome, email, telefone });

      if (nome && email && telefone) {
        enviarFormulario(nome, email, telefone);
        formDesktop.reset();
      } else {
        alert("Por favor, preencha todos os campos.");
      }
    });
  }

  // Seleciona o formulário mobile pela classe
  const formMobile = document.querySelector(".formulario-mobile");
  console.log("Form mobile encontrado?", formMobile);
  if (formMobile) {
    formMobile.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = formMobile.querySelector("#nome").value.trim();
      const email = formMobile.querySelector("#email").value.trim();
      const telefone = formMobile.querySelector("#telefone").value.trim();

      console.log("Dados do formulário mobile:", { nome, email, telefone });

      if (nome && email && telefone) {
        enviarFormulario(nome, email, telefone);
        formMobile.reset();
      } else {
        alert("Por favor, preencha todos os campos.");
      }
    });
  }
});





