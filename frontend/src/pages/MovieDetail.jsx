import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Alert, Card, ListGroup, Spinner } from 'react-bootstrap'
import MovieDetailCard from '../components/MovieDetailCard.jsx'

function MovieDetail() {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        async function fetchMovieDetail() {
            setIsLoading(true)
            setErrorMessage('')

            try {
                const response = await axios.get(`http://localhost:3000/movies/${id}`)
                setMovie(response.data.movie)
                setReviews(response.data.reviews ?? [])
            } catch (error) {
                if (error.response?.status === 404) {
                    setErrorMessage('Film non trovato.')
                } else {
                    setErrorMessage('Errore durante il recupero del dettaglio film.')
                }
            } finally {
                setIsLoading(false)
            }
        }

        fetchMovieDetail()
    }, [id])

    function getReviewAuthor(review) {
        return review.reviewer_name ?? review.name ?? review.author ?? 'Utente'
    }

    function getReviewText(review) {
        return review.text ?? review.content ?? review.comment ?? review.review ?? 'Recensione non disponibile.'
    }

    function getReviewVote(review) {
        return review.vote ?? review.rating ?? review.score ?? null
    }

    return (
        <section>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h1 className="mb-0">Dettaglio film</h1>
                <Link className="btn btn-outline-primary" to="/">
                    Torna alla home
                </Link>
            </div>

            {isLoading && (
                <div className="d-flex align-items-center gap-2">
                    <Spinner animation="border" size="sm" />
                    <span>Caricamento dettaglio...</span>
                </div>
            )}

            {!isLoading && errorMessage && (
                <Alert variant="warning" className="mb-0">
                    {errorMessage}
                </Alert>
            )}

            {!isLoading && !errorMessage && movie && (
                <>
                    <MovieDetailCard movie={movie} />

                    <Card className="shadow-sm mt-4">
                        <Card.Body>
                            <Card.Title as="h3" className="mb-3">
                                Recensioni
                            </Card.Title>

                            {reviews.length === 0 ? (
                                <p className="text-muted mb-0">Nessuna recensione disponibile.</p>
                            ) : (
                                <ListGroup variant="flush">
                                    {reviews.map((review) => {
                                        const vote = getReviewVote(review)

                                        return (
                                            <ListGroup.Item key={review.id} className="px-0">
                                                <p className="fw-semibold mb-1">{getReviewAuthor(review)}</p>
                                                {vote !== null && (
                                                    <p className="text-muted mb-1">Voto: {vote}</p>
                                                )}
                                                <p className="mb-0">{getReviewText(review)}</p>
                                            </ListGroup.Item>
                                        )
                                    })}
                                </ListGroup>
                            )}
                        </Card.Body>
                    </Card>
                </>
            )}
        </section>
    )
}

export default MovieDetail
