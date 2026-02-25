import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <section className="page-hero section-card text-center shadow-sm py-5 px-4">
            <p className="text-primary fw-semibold mb-2">Errore 404</p>
            <h1 className="display-6 fw-bold mb-3">Oops, pagina non trovata</h1>
            <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '540px' }}>
                L'indirizzo richiesto non esiste o è stato spostato. Puoi tornare alla home e continuare la
                navigazione.
            </p>
            <Link className="btn btn-primary btn-lg px-4" to="/">
                Torna alla home
            </Link>
        </section>
    )
}

export default NotFound
