const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

let peliculas = [
    { id: 1, titulo: 'El Padrino', genero: 'Drama', year: 1972 },
    { id: 2, titulo: 'Titanic', genero: 'Romance', year: 1997 },
    { id: 3, titulo: 'Avatar', genero: 'Ciencia ficción', year: 2009 },
    { id: 4, titulo: 'Jurassic Park', genero: 'Aventura', year: 1993 },
    { id: 5, titulo: 'Pulp Fiction', genero: 'Crimen', year: 1994 },
];

app.get('/peliculas', (req, res) => {
    res.json(peliculas);
});

app.get('/peliculas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pelicula = peliculas.find(p => p.id === id);

    if (pelicula) {
        res.json(pelicula);
    } else {
        res.status(404).json({ mensaje: 'Película no encontrada' });
    }
});

app.post('/peliculas', (req, res) => {
    const nuevaPelicula = req.body;
    peliculas.push(nuevaPelicula);
    res.status(201).json(nuevaPelicula);
});

app.put('/peliculas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = peliculas.findIndex(p => p.id === id);

    if (index !== -1) {
        peliculas[index] = { ...peliculas[index], ...req.body };
        res.json(peliculas[index]);
    } else {
        res.status(404).json({ mensaje: 'Película no encontrada' });
    }
});

app.delete('/peliculas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    peliculas = peliculas.filter(p => p.id !== id);
    res.json({ mensaje: 'Película eliminada exitosamente' });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
