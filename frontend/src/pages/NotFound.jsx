import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <section className="text-center">
            <h1 className="mb-3">Pagina non trovata</h1>
            <p className="text-muted">La risorsa richiesta non esiste.</p>
            <Link className="btn btn-primary" to="/">
                Torna alla home
            </Link>
        </section>
    )
}

export default NotFound
