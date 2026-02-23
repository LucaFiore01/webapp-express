const express = require('express');

const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// File statici: immagini servite da /images
app.use('/images', express.static('public/images'));

app.get('/', (req, res) => {
    res.send('Ciao! Server Express attivo.');
});

app.use('/', apiRoutes);

// Middleware per rotte inesistenti
app.use((req, res) => {
    res.status(404).json({ error: 'Rotta non trovata' });
});

// Middleware per errori generici
app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Errore interno del server' });
});

app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
