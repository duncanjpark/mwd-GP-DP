import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { isAuthenticated } from "../Auth/AuthService";
import { logoutUser } from "../Auth/AuthService";
import { useNavigate } from "react-router-dom";

// Component used to display a Navbar throughout the site
export default function NavBar() {

    const navigate = useNavigate();
    const handleLogout = () => {
        // When the logout is clicked, return to unauth main page
        logoutUser().then(() => {
            console.log("User has been logged out");
            navigate('/auth');
        });
    };

    return (
        <Navbar expand="lg" bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">Chill Fitness</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                    </Nav>
                    <Nav>
                        {isAuthenticated() ? (
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>  // Logout option for authenticated users
                        ) : (
                            <Nav.Link href="/auth">Login or Register</Nav.Link>  // Display Login/Register if not authenticated
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}