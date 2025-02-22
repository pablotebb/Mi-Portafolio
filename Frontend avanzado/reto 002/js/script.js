// Agregar interactividad al sitio web

// Desplazamiento suave para los enlaces de navegación
document.querySelectorAll("nav ul li a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // Evita el comportamiento predeterminado del enlace (navegación instantánea)
    const targetId = this.getAttribute("href").substring(1); // Obtiene el ID de la sección objetivo (elimina el "#")
    const targetSection = document.getElementById(targetId); // Selecciona la sección objetivo usando el ID

    // Desplaza suavemente hasta la sección objetivo
    targetSection.scrollIntoView({
      behavior: "smooth", // Desplazamiento suave
      block: "start", // Alinea la sección en la parte superior de la ventana
    });
  });
});

// Botón para alternar el modo oscuro
const darkModeButton = document.createElement("button"); // Crea un nuevo botón
darkModeButton.textContent = "Activar o desactivar el modo oscuro"; // Establece el texto del botón
darkModeButton.style.position = "fixed"; // Posiciona el botón de manera fija en la pantalla
darkModeButton.style.bottom = "10px"; // Coloca el botón a 10px del borde inferior
darkModeButton.style.right = "10px"; // Coloca el botón a 10px del borde derecho
darkModeButton.style.padding = "10px"; // Añade relleno interno al botón
darkModeButton.style.backgroundColor = "#2c3e50"; // Color de fondo del botón
darkModeButton.style.color = "white"; // Color del texto del botón
darkModeButton.style.border = "none"; // Elimina el borde del botón
darkModeButton.style.cursor = "pointer"; // Cambia el cursor a una mano al pasar sobre el botón
darkModeButton.style.borderRadius = "5px"; // Bordes redondeados para el botón
document.body.appendChild(darkModeButton); // Añade el botón al cuerpo del documento

// Alternar el modo oscuro al hacer clic en el botón
darkModeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode"); // Alterna la clase "dark-mode" en el cuerpo del documento
});

// Agregar estilos para el modo oscuro
document.head.insertAdjacentHTML(
  "beforeend",
  `
    <style>
        .dark-mode {
            background-color: #121212; /* Fondo oscuro para el cuerpo */
            color: #e0e0e0; /* Texto claro para el cuerpo */
        }
        .dark-mode header, .dark-mode footer {
            background-color: #1a1a1a; /* Fondo oscuro para el encabezado y el pie de página */
        }
        .dark-mode nav ul li a {
            color: #e0e0e0; /* Texto claro para los enlaces de navegación */
        }
        .dark-mode .castle {
            background-color: #1e1e1e; /* Fondo oscuro para las secciones de castillos */
            border-color: #333; /* Borde oscuro para las secciones de castillos */
        }
        .dark-mode .castle aside {
            background-color: #252525; /* Fondo oscuro para el aside dentro de las secciones */
        }
    </style>
`
);
