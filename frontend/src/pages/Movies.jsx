import { Link } from 'react-router-dom'

function Movies() {
    return (
        <section>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h1 className="mb-0">Film</h1>
                <Link className="btn btn-outline-primary" to="/">
                    Torna alla home
                </Link>
            </div>
            <div className="placeholder-panel shadow-sm">
                <p className="text-muted mb-0">Qui comparirà la lista completa dei film.</p>
            </div>
        </section>
    )
}

export default Movies
