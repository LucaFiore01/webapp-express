import { Spinner } from 'react-bootstrap'

function Loader({ message = 'Caricamento in corso...', fullScreen = false }) {
    return (
        <div
            className={fullScreen ? 'loader-overlay' : 'd-flex align-items-center gap-2'}
            role="status"
            aria-live="polite"
        >
            <Spinner animation="border" size="sm" />
            <span>{message}</span>
        </div>
    )
}

export default Loader
