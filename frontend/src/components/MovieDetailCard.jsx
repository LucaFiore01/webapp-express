import { Card, Col, Row } from 'react-bootstrap'

function MovieDetailCard({ movie }) {
    return (
        <Card className="shadow-sm movie-detail-card">
            <Row className="g-0">
                <Col md={4}>
                    {movie.image ? (
                        <Card.Img
                            src={movie.image}
                            alt={movie.title}
                            className="h-100 movie-cover"
                            style={{ objectFit: 'cover', minHeight: '300px' }}
                        />
                    ) : (
                        <div
                            className="d-flex align-items-center justify-content-center bg-secondary-subtle text-muted h-100"
                            style={{ minHeight: '300px' }}
                        >
                            Nessuna copertina
                        </div>
                    )}
                </Col>
                <Col md={8}>
                    <Card.Body className="p-4 p-lg-5">
                        <Card.Title as="h2" className="mb-3">
                            {movie.title}
                        </Card.Title>
                        <div className="d-flex flex-wrap gap-2 mb-4">
                            <span className="info-chip">Regia: {movie.director}</span>
                            <span className="info-chip">Anno: {movie.release_year ?? movie.year}</span>
                            <span className="info-chip">Genere: {movie.genre}</span>
                        </div>
                        <Card.Text>{movie.plot ?? 'Trama non disponibile.'}</Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

export default MovieDetailCard
