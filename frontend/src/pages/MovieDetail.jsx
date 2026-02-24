import { Link, useParams } from 'react-router-dom'

function MovieDetail() {
    const { id } = useParams()

    return (
        <section>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h1 className="mb-0">Dettaglio film</h1>
                <Link className="btn btn-outline-primary" to="/movies">
                    Torna ai film
                </Link>
            </div>
            <p className="text-muted">ID selezionato: {id}</p>
        </section>
    )
}

export default MovieDetail
