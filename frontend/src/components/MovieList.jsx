import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function MovieList({ movies }) {
    return (
        <Row className="g-4">
            {movies.map((movie) => (
                <Col key={movie.id} xs={12} md={6} lg={4}>
                    <Card className="h-100 shadow-sm border-0 movie-card">
                        {movie.image ? (
                            <Card.Img
                                variant="top"
                                src={movie.image}
                                alt={movie.title}
                                className="movie-cover"
                                style={{ height: '320px', objectFit: 'cover' }}
                            />
                        ) : (
                            <div
                                className="movie-poster-placeholder d-flex align-items-center justify-content-center bg-secondary-subtle text-muted"
                                style={{ height: '320px' }}
                            >
                                Nessuna copertina
                            </div>
                        )}
                        <Card.Body className="d-flex flex-column p-4">
                            <Card.Title className="mb-3">{movie.title}</Card.Title>
                            <Card.Text className="text-muted mb-3">
                                {movie.director} · {movie.release_year ?? movie.year}
                            </Card.Text>
                            <Card.Text className="mb-4">
                                <span className="info-chip">{movie.genre}</span>
                            </Card.Text>
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
