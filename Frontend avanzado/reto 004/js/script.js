// Espera a que el contenido del DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
  // Selecciona todas las imágenes de la galería
  const images = document.querySelectorAll(".gallery-image");
  // Selecciona el modal por su ID
  const modal = document.getElementById("modal");
  // Selecciona la imagen dentro del modal por su ID
  const modalImg = document.getElementById("modal-img");
  // Selecciona el botón de cerrar el modal
  const closeBtn = document.querySelector(".close");
  // Selecciona el botón de navegación "anterior"
  const prevBtn = document.querySelector(".prev");
  // Selecciona el botón de navegación "siguiente"
  const nextBtn = document.querySelector(".next");
  // Variable para almacenar el índice de la imagen actual
  let currentIndex = 0;

  // Itera sobre cada imagen de la galería
  images.forEach((img, index) => {
    // Agrega un evento de clic a cada imagen
    img.addEventListener("click", () => {
      // Actualiza el índice de la imagen actual
      currentIndex = index;
      // Abre el modal con la imagen seleccionada
      openModal(img.src);
    });
  });

  // Agrega un evento de clic al botón de cerrar el modal
  closeBtn.addEventListener("click", () => {
    // Cierra el modal
    closeModal();
  });

  // Agrega un evento de clic al botón "anterior"
  prevBtn.addEventListener("click", () => {
    // Navega a la imagen anterior
    navigate(-1);
  });

  // Agrega un evento de clic al botón "siguiente"
  nextBtn.addEventListener("click", () => {
    // Navega a la imagen siguiente
    navigate(1);
  });

  // Agrega un evento de clic al modal
  modal.addEventListener("click", (e) => {
    // Si el clic fue fuera de la imagen (en el fondo oscuro), cierra el modal
    if (e.target === modal) {
      closeModal();
    }
  });

  // Agrega un evento de teclado para navegar con las flechas y cerrar con Escape
  document.addEventListener("keydown", (e) => {
    // Verifica si el modal está visible
    if (modal.style.display === "block") {
      // Si se presiona la flecha izquierda, navega a la imagen anterior
      if (e.key === "ArrowLeft") {
        navigate(-1);
      }
      // Si se presiona la flecha derecha, navega a la imagen siguiente
      else if (e.key === "ArrowRight") {
        navigate(1);
      }
      // Si se presiona la tecla Escape, cierra el modal
      else if (e.key === "Escape") {
        closeModal();
      }
    }
  });

  // Función para abrir el modal con una imagen específica
  function openModal(src) {
    // Muestra el modal cambiando su estilo a "block"
    modal.style.display = "block";
    // Establece la fuente de la imagen en el modal
    modalImg.src = src;
    // Establece el texto alternativo de la imagen en el modal
    modalImg.alt = images[currentIndex].alt;
  }

  // Función para cerrar el modal
  function closeModal() {
    // Oculta el modal cambiando su estilo a "none"
    modal.style.display = "none";
  }

  // Función para navegar entre las imágenes
  function navigate(direction) {
    // Actualiza el índice de la imagen actual sumando la dirección (1 o -1)
    currentIndex += direction;
    // Si el índice supera el número de imágenes, vuelve al inicio
    if (currentIndex >= images.length) {
      currentIndex = 0;
    }
    // Si el índice es menor que 0, va a la última imagen
    else if (currentIndex < 0) {
      currentIndex = images.length - 1;
    }
    // Actualiza la imagen en el modal con la nueva imagen seleccionada
    modalImg.src = images[currentIndex].src;
    // Actualiza el texto alternativo de la imagen en el modal
    modalImg.alt = images[currentIndex].alt;
  }
});
