const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Element = require("./models/Element");

const app = express();

// Conexión a MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/crud_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.log(err));

// Configuración
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Rutas
app.get("/", async (req, res) => {
  const elements = await Element.find();
  res.render("index", { elements });
});

app.post("/add", async (req, res) => {
  const { url, description } = req.body;
  const newElement = new Element({ url, description });
  await newElement.save();
  res.redirect("/");
});

app.post("/delete/:id", async (req, res) => {
  await Element.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

app.post("/update", async (req, res) => {
  const { id, url, description } = req.body;

  try {
    // Actualiza el elemento en la base de datos
    await Element.findByIdAndUpdate(id, { url, description });
    res.redirect("/");
  } catch (err) {
    console.error("Error al actualizar el elemento:", err);
    res.status(500).send("Error al actualizar el elemento");
  }
});

// Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
