import { Link, useParams } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import MovieDetailCard from '../components/MovieDetailCard.jsx'
import movies from '../data/movies.js'

function MovieDetail() {
    const { id } = useParams()
    const movie = movies.find((item) => String(item.id) === id)

    return (
        <section>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h1 className="mb-0">Dettaglio film</h1>
                <Link className="btn btn-outline-primary" to="/">
                    Torna alla home
                </Link>
            </div>

            {!movie ? (
                <Alert variant="warning" className="mb-0">
                    Film non trovato.
                </Alert>
            ) : (
                <MovieDetailCard movie={movie} />
            )}
        </section>
    )
}

export default MovieDetail
