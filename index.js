const express = require('express');
const mysql = require('mysql2/promise');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// File statici: immagini servite da /images
app.use('/images', express.static('public/images'));

// Connessione semplice al DB usando le variabili in .env
const dbConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

app.get('/', (req, res) => {
    res.send('Ciao! Server Express attivo.');
});

// Endpoint di test: esegue una query molto semplice
app.get('/health', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.query('SELECT 1 AS ok');
        await connection.end();

        res.json({ ok: true, result: rows[0] });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
});

// Rotta index: restituisce la lista dei film
app.get('/movies', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.query(
            'SELECT id, title, director, genre, release_year FROM movies'
        );
        await connection.end();

        res.json(rows);
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
});

// Rotta show: dettaglio di un film e le sue recensioni
app.get('/movies/:id', async (req, res) => {
    const movieId = Number(req.params.id);

    if (Number.isNaN(movieId)) {
        return res.status(400).json({ ok: false, error: 'ID non valido' });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);

        const [movies] = await connection.query(
            'SELECT * FROM movies WHERE id = ?',
            [movieId]
        );

        if (movies.length === 0) {
            await connection.end();
            return res.status(404).json({ ok: false, error: 'Film non trovato' });
        }

        const [reviews] = await connection.query(
            'SELECT * FROM reviews WHERE movie_id = ?',
            [movieId]
        );

        await connection.end();

        res.json({ movie: movies[0], reviews });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
