import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <section className="page-hero section-card text-center shadow-sm">
            <p className="text-muted fw-semibold mb-2">Errore 404</p>
            <h1 className="mb-3">Pagina non trovata</h1>
            <p className="text-muted mb-4">La risorsa richiesta non esiste o è stata spostata.</p>
            <Link className="btn btn-primary px-4" to="/">
                Torna alla home
            </Link>
        </section>
    )
}

export default NotFound
