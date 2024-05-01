import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { getUserSessionDetail } from '../../../Common/Services/SessionService';

// Component to display detailed view of a single previous session
export default function PreviousSessionDetails() {
    // Extract sessionId from URL parameters
    const { sessionId } = useParams();
    const [sessionDetails, setSessionDetails] = useState(null);
    // States to manage loading and error status
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Effect to fetch session details based on sessionId
    useEffect(() => {
        setLoading(true); // Set loading state to true when starting to fetch
        getUserSessionDetail(sessionId).then(details => {
            setSessionDetails(details); // Store fetched details in state
            setLoading(false); // Set loading to false after fetch completes
        }).catch(error => {
            console.error('Failed to fetch session details:', error);
            // Set an error if a user tries to navigate to unauthorized session
            setError("Failed to load session details or session does not belong to you.");
            setLoading(false);
        });
    }, [sessionId]);

    // Display loading indicator while fetching data
    if (loading) {
        return <div>Loading session details...</div>;
    }

    // Render an error message and a back button if there is an error
    if (error) {
        return (
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h2>Error: {error}</h2>
                        <Button className='mt-5' onClick={() => navigate('/previous-sessions')}>Back to Sessions</Button>
                    </Col>
                </Row>
            </Container>
        );
    }

    // Collect unique muscles worked from the session details
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
                    <Button onClick={() => navigate('/previous-sessions')}>Back to Sessions</Button>
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