import { Link } from 'react-router-dom'

function Movies() {
    return (
        <section>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h1 className="mb-0">Film</h1>
                <Link className="btn btn-outline-primary" to="/">
                    Torna alla home
                </Link>
            </div>
            <p className="text-muted">Qui comparira la lista dei film.</p>
        </section>
    )
}

export default Movies
