const express = require('express');

const healthRoutes = require('./routes/health');
const moviesRoutes = require('./routes/movies');

const app = express();
const PORT = process.env.PORT || 3000;

// File statici: immagini servite da /images
app.use('/images', express.static('public/images'));

app.get('/', (req, res) => {
    res.send('Ciao! Server Express attivo.');
});

app.use('/health', healthRoutes);
app.use('/movies', moviesRoutes);

app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
