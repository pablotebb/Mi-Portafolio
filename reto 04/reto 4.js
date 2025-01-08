/*
 Programa Reto 4
 Curso Javascript 
 */

// Variables
let nombreCompleto = "Pablo Benito Boniato";
let edad = 59;
let gustaProgramacion = true;

// Objeto
const persona = {
  nombre: "Pablo Benito Boniato",
  edad: 59,
  gustaProgramacion: true,
};

// Array
const intereses = [
  "me gusta programar",
  "me gusta la informatica",
  "me gusta la IA",
];

// Llamamos función
mostrarInfo(persona);

// Función mostrarInfo
function mostrarInfo(persona) {
  // Muestro datos de la persona
  console.log("Nombre: ", persona.nombre);
  console.log("Edad: ", persona.edad);
  console.log(
    "Te gusta la programación: ",
    persona.gustaProgramacion ? "Si" : "No"
  );
  // Muestro intereses de la persona
  console.log("Intereses: ");
  for (var i = 0; i < intereses.length; i++) {
    console.log(intereses[i], ", ");
  }
}
