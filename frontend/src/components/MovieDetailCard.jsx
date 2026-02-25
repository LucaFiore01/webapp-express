import { Card, Col, Row } from 'react-bootstrap'

function MovieDetailCard({ movie }) {
    return (
        <Card className="shadow-sm">
            <Row className="g-0">
                <Col md={4}>
                    {movie.image ? (
                        <Card.Img
                            src={movie.image}
                            alt={movie.title}
                            className="h-100"
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
                    <Card.Body>
                        <Card.Title as="h2" className="mb-3">
                            {movie.title}
                        </Card.Title>
                        <Card.Text className="text-muted mb-2">
                            Regia: {movie.director}
                        </Card.Text>
                        <Card.Text className="text-muted mb-2">
                            Anno: {movie.release_year ?? movie.year}
                        </Card.Text>
                        <Card.Text className="text-muted mb-4">Genere: {movie.genre}</Card.Text>
                        <Card.Text>{movie.plot ?? 'Trama non disponibile.'}</Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

export default MovieDetailCard
