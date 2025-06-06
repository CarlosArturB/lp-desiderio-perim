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

  // Função para enviar email via emailjs
  function enviarFormularioEmailJS(nome, email, telefone) {
    const templateParams = { nome, email, telefone };

    return emailjs.send("service_b7eyued", "template_4cnm8ts", templateParams);
  }

  // Função para enviar lead para o backend via fetch
  async function salvarLeadNoBanco(nome, email, telefone) {
    try {
      const response = await fetch("http://localhost:3000/createleads", { // ajuste a URL se necessário
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nome,
          email,
          phone: telefone,
          leadorigin: "desiderio",
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status} ao salvar lead no banco`);
      }

      const data = await response.json();
      console.log("Lead salvo no banco:", data);
      return true;
    } catch (error) {
      console.error("Erro ao salvar lead:", error.message);
      return false;
    }
  }

  // Função para enviar ambos (emailjs + salvar no banco)
  async function enviarFormulario(nome, email, telefone) {
    try {
      // Enviar email
      await enviarFormularioEmailJS(nome, email, telefone);

      // Salvar lead no banco
      const salvo = await salvarLeadNoBanco(nome, email, telefone);

      if (salvo) {
        mostrarToast(
          "Mensagem enviada e lead salvo com sucesso!",
          "linear-gradient(to right, #00b09b, #96c93d)"
        );
      } else {
        mostrarToast(
          "Mensagem enviada, mas erro ao salvar lead.",
          "linear-gradient(to right, #ff5f6d, #ffc371)"
        );
      }
    } catch (error) {
      mostrarToast(
        "Erro ao enviar. Tente novamente.",
        "linear-gradient(to right, #ff5f6d, #ffc371)"
      );
      console.error("FAILED...", error);
    }
  }

  function adicionarEventoFormulario(form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = form.querySelector("#nome").value.trim();
      const email = form.querySelector("#email").value.trim();
      const telefone = form.querySelector("#telefone").value.trim();

      if (nome && email && telefone) {
        enviarFormulario(nome, email, telefone);
        form.reset();
      } else {
        mostrarToast(
          "Por favor, preencha todos os campos.",
          "linear-gradient(to right, #ff5f6d, #ffc371)"
        );
      }
    });
  }

  const formDesktop = document.getElementById("formdesktop");
  if (formDesktop) {
    adicionarEventoFormulario(formDesktop);
  }

  const formMobile = document.querySelector(".formulario-mobile");
  if (formMobile) {
    adicionarEventoFormulario(formMobile);
  }
});







