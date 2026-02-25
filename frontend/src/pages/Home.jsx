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
            <h1 className="mb-3">Film in evidenza</h1>
            <p className="text-muted mb-4">Lista film caricata dal backend tramite chiamata Ajax.</p>

            {isLoading && (
                <div className="d-flex align-items-center gap-2">
                    <Spinner animation="border" size="sm" />
                    <span>Caricamento film...</span>
                </div>
            )}

            {!isLoading && errorMessage && (
                <Alert variant="danger" className="mb-0">
                    {errorMessage}
                </Alert>
            )}

            {!isLoading && !errorMessage && <MovieList movies={movies} />}
        </section>
    )
}

export default Home
