import React from 'react';
import { useLocation, useParams, Navigate } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';


export default function PreviousSessionDetails() {


    const location = useLocation();
    const { sessionId } = useParams();
    const sessionDetails = location.state?.sessionDetails;

    if (!sessionDetails) {
        // Optionally fetch the details again or redirect
        return <Navigate to="/previous-sessions" />;
    }

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h1 className="text-center mb-4">Session Details for {new Date(sessionDetails.date).toLocaleDateString()}</h1>
                    <Card>
                        <Card.Header as="h5">Workout Details</Card.Header>
                        <ListGroup variant="flush">
                            {sessionDetails.personalWorkouts.map((workout, index) => (
                                <ListGroup.Item key={index}>
                                    <strong>{workout.name}</strong>: {workout.sets} sets of {workout.reps} reps at {workout.weight} lbs
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
