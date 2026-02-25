import { useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'

function ReviewForm({ onSubmit, isSubmitting, errorMessage, successMessage }) {
    const [name, setName] = useState('')
    const [vote, setVote] = useState(5)
    const [text, setText] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()

        await onSubmit({
            name: name.trim(),
            vote: Number(vote),
            text: text.trim(),
        })

        setName('')
        setVote(5)
        setText('')
    }

    return (
        <Card className="shadow-sm mt-4">
            <Card.Body>
                <Card.Title as="h3" className="mb-3">
                    Aggiungi una recensione
                </Card.Title>

                {errorMessage && (
                    <Alert variant="danger" className="mb-3">
                        {errorMessage}
                    </Alert>
                )}

                {successMessage && (
                    <Alert variant="success" className="mb-3">
                        {successMessage}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="review-name">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Inserisci il tuo nome"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="review-vote">
                        <Form.Label>Voto</Form.Label>
                        <Form.Select
                            value={vote}
                            onChange={(event) => setVote(event.target.value)}
                            required
                        >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="review-text">
                        <Form.Label>Recensione</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Scrivi la tua recensione"
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Invio...' : 'Invia recensione'}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default ReviewForm
