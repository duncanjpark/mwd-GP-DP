import React from "react";
import { Container, Row, Col, Nav } from 'react-bootstrap';

// Home component used for unauthorized users
export default function Landing() {

    return (
        <Container className="text-center justify-content-center mt-5 pt-5">
            <Row>
                <Col>
                    <h1 className="mb-3">Welcome to Chill Fitness</h1>
                    <p className="lead text-muted mb-4">
                        Track and understand your fitness journey with state-of-the-art visualizations and data analysis.
                    </p>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Nav.Link href="/about" className="text-white bg-primary px-3 py-2 w-25 rounded">
                    Learn More
                </Nav.Link>
            </Row>
        </Container>
    );
    };
