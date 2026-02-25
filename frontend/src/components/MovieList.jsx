import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function MovieList({ movies }) {
    return (
        <Row className="g-4">
            {movies.map((movie) => (
                <Col key={movie.id} xs={12} md={6} lg={4}>
                    <Card className="h-100 shadow-sm">
                        <Card.Img
                            variant="top"
                            src={movie.image}
                            alt={movie.title}
                            style={{ height: '320px', objectFit: 'cover' }}
                        />
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>{movie.title}</Card.Title>
                            <Card.Text className="text-muted mb-2">
                                {movie.director} · {movie.year}
                            </Card.Text>
                            <Card.Text className="mb-4">{movie.genre}</Card.Text>
                            <Button as={Link} to={`/movies/${movie.id}`} variant="primary" className="mt-auto">
                                Vedi dettaglio
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default MovieList
