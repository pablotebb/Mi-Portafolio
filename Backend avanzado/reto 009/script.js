document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("weather-form");
  const listContainer = document.querySelector(".list-container");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const entry = document.createElement("div");
    entry.classList.add("list-item");

    let dataText = "";
    for (const [key, value] of formData.entries()) {
      dataText += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value} | `;
    }

    entry.innerHTML = `
            <input type="checkbox">
            <span>${dataText.slice(0, -2)}</span>
            <button class="edit-btn">Editar</button>
            <button class="delete-btn">Borrar</button>
        `;

    listContainer.appendChild(entry);
    form.reset();
  });

  listContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
      event.target.parentElement.remove();
    }
  });
});
