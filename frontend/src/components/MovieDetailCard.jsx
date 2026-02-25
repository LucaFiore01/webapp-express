import { Card, Col, Row } from 'react-bootstrap'

function MovieDetailCard({ movie }) {
    return (
        <Card className="shadow-sm">
            <Row className="g-0">
                <Col md={4}>
                    <Card.Img
                        src={movie.image}
                        alt={movie.title}
                        className="h-100"
                        style={{ objectFit: 'cover', minHeight: '300px' }}
                    />
                </Col>
                <Col md={8}>
                    <Card.Body>
                        <Card.Title as="h2" className="mb-3">
                            {movie.title}
                        </Card.Title>
                        <Card.Text className="text-muted mb-2">
                            Regia: {movie.director}
                        </Card.Text>
                        <Card.Text className="text-muted mb-2">Anno: {movie.year}</Card.Text>
                        <Card.Text className="text-muted mb-4">Genere: {movie.genre}</Card.Text>
                        <Card.Text>{movie.plot}</Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

export default MovieDetailCard
