import { useEffect, useState } from 'react'
import axios from 'axios'
import { Alert, Spinner } from 'react-bootstrap'
import MovieList from '../components/MovieList.jsx'

function Home() {
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await axios.get('http://localhost:3000/movies')
                setMovies(response.data)
            } catch (error) {
                setErrorMessage('Errore durante il recupero dei film dal server.')
            } finally {
                setIsLoading(false)
            }
        }

        fetchMovies()
    }, [])

    return (
        <section>
            <div className="page-hero shadow-sm">
                <h1 className="mb-2">Film in evidenza</h1>
                <p className="text-muted mb-0">Lista film caricata dal backend tramite chiamata Ajax.</p>
            </div>

            {isLoading && (
                <div className="section-card d-flex align-items-center gap-2 p-3">
                    <Spinner animation="border" size="sm" />
                    <span>Caricamento film...</span>
                </div>
            )}

            {!isLoading && errorMessage && (
                <Alert variant="danger" className="mb-0 section-card">
                    {errorMessage}
                </Alert>
            )}

            {!isLoading && !errorMessage && <MovieList movies={movies} />}
        </section>
    )
}

export default Home
