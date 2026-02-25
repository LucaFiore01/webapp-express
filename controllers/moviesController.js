const { getConnection } = require('../db');

function buildImageUrl(req, imageValue) {
    if (!imageValue) {
        return null;
    }

    if (String(imageValue).startsWith('http://') || String(imageValue).startsWith('https://')) {
        return imageValue;
    }

    const fileName = String(imageValue).replace(/^\/+/, '');
    return `${req.protocol}://${req.get('host')}/images/${fileName}`;
}

function normalizeMovie(req, movie) {
    return {
        ...movie,
        image: buildImageUrl(req, movie.image)
    };
}

async function index(req, res) {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(
            'SELECT id, title, director, genre, release_year, image FROM movies'
        );
        await connection.end();

        res.json(rows.map((movie) => normalizeMovie(req, movie)));
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
}

async function show(req, res) {
    const movieId = Number(req.params.id);

    if (Number.isNaN(movieId)) {
        return res.status(400).json({ ok: false, error: 'ID non valido' });
    }

    try {
        const connection = await getConnection();

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

        res.json({ movie: normalizeMovie(req, movies[0]), reviews });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
}

module.exports = { index, show };
