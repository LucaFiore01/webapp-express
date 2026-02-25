const { getConnection } = require('../db');

const COVER_BY_TITLE = {
    inception: 'inception.jpg',
    'the godfather': 'the_godfather.jpg',
    titanic: 'titanic.jpg',
    'the matrix': 'matrix.jpg',
    interstellar: 'interstellar.jpg'
};

function getCoverFileName(movie) {
    const titleKey = String(movie.title || '').trim().toLowerCase();
    if (COVER_BY_TITLE[titleKey]) {
        return COVER_BY_TITLE[titleKey];
    }

    if (!movie.image) {
        return null;
    }

    return String(movie.image).split('/').pop();
}

function buildImageUrl(req, fileName) {
    if (!fileName) {
        return null;
    }

    const normalizedFileName = String(fileName).replace(/^\/+/, '');
    return `${req.protocol}://${req.get('host')}/images/${normalizedFileName}`;
}

function normalizeMovie(req, movie) {
    const coverFileName = getCoverFileName(movie);

    return {
        ...movie,
        image: buildImageUrl(req, coverFileName)
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
            'SELECT * FROM reviews WHERE movie_id = ? ORDER BY created_at ASC, id ASC',
            [movieId]
        );

        await connection.end();

        res.json({ movie: normalizeMovie(req, movies[0]), reviews });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
}

async function storeReview(req, res) {
    const movieId = Number(req.params.id);
    const { name, vote, text } = req.body;

    if (Number.isNaN(movieId)) {
        return res.status(400).json({ ok: false, error: 'ID non valido' });
    }

    if (!name || typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({ ok: false, error: 'Il nome è obbligatorio' });
    }

    if (!text || typeof text !== 'string' || !text.trim()) {
        return res.status(400).json({ ok: false, error: 'Il testo della recensione è obbligatorio' });
    }

    const numericVote = Number(vote);
    if (!Number.isInteger(numericVote) || numericVote < 1 || numericVote > 5) {
        return res.status(400).json({ ok: false, error: 'Il voto deve essere un numero intero tra 1 e 5' });
    }

    try {
        const connection = await getConnection();

        const [movies] = await connection.query('SELECT id FROM movies WHERE id = ?', [movieId]);
        if (movies.length === 0) {
            await connection.end();
            return res.status(404).json({ ok: false, error: 'Film non trovato' });
        }

        const [result] = await connection.query(
            'INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)',
            [movieId, name.trim(), numericVote, text.trim()]
        );

        const [createdReviews] = await connection.query('SELECT * FROM reviews WHERE id = ?', [result.insertId]);
        await connection.end();

        return res.status(201).json({ ok: true, review: createdReviews[0] });
    } catch (err) {
        return res.status(500).json({ ok: false, error: err.message });
    }
}

module.exports = { index, show, storeReview };
