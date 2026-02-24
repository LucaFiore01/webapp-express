import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, Outlet } from 'react-router-dom'

function MainLayout() {
    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={NavLink} to="/">
                        MovieHub
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="main-navbar" />
                    <Navbar.Collapse id="main-navbar">
                        <Nav className="ms-auto">
                            <Nav.Link as={NavLink} to="/">
                                Home
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/movies">
                                Movies
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="flex-grow-1 py-4">
                <Outlet />
            </Container>

            <footer className="bg-white border-top py-3">
                <Container className="text-center text-muted">
                    MovieHub - React + Vite
                </Container>
            </footer>
        </div>
    )
}

export default MainLayout
