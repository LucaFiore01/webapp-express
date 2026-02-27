import { Spinner } from 'react-bootstrap'

function Loader({ message = 'Caricamento in corso...' }) {
    return (
        <div className="d-flex align-items-center gap-2" role="status" aria-live="polite">
            <Spinner animation="border" size="sm" />
            <span>{message}</span>
        </div>
    )
}

export default Loader
