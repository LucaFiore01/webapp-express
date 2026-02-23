const { getConnection } = require('../db');

async function health(req, res) {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query('SELECT 1 AS ok');
        await connection.end();

        res.json({ ok: true, result: rows[0] });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
}

module.exports = { health };
