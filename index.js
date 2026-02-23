const express = require('express');
const mysql = require('mysql2/promise');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
