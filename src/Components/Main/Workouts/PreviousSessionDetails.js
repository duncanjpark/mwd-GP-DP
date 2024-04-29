import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';


export default function PreviousSessionDetails() {

    const location = useLocation();
    const sessionDetails = location.state?.sessionDetails;

    if (!sessionDetails) {
        // Redirect if invalid session
        return <Navigate to="/previous-sessions" />;
    }

    const musclesWorked = new Set();
    sessionDetails.personalWorkouts.forEach(workout => {
        workout.musclesTargeted.forEach(muscle => {
            musclesWorked.add(muscle);
        });
    });
    
    return (
        <Container className="mt-5">
            <Row>
                <Col xs={12}>
                    <Button href="/previous-sessions">Back to sessions</Button>
                </Col>
            </Row>
            <Row className="justify-content-center mt-5">
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
                    <Card className="mt-4">
                        <Card.Header as="h5">Muscles Worked</Card.Header>
                        <ListGroup variant="flush">
                            {[...musclesWorked].map((muscle, index) => (
                                <ListGroup.Item key={index}>{muscle}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}