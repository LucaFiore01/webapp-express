import MovieList from '../components/MovieList.jsx'
import movies from '../data/movies.js'

function Home() {
    return (
        <section>
            <h1 className="mb-3">Film in evidenza</h1>
            <p className="text-muted mb-4">Lista film statica con accesso al dettaglio.</p>
            <MovieList movies={movies} />
        </section>
    )
}

export default Home
