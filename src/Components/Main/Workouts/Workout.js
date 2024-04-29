import React, { useEffect, useState } from 'react';
import { Container, Card, CardGroup, Row, Col } from 'react-bootstrap';
import { getAllWorkouts } from '../../../Common/Services/WorkoutService';

export default function Workout() {

    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        getAllWorkouts()
            .then(setWorkouts)
            .catch(error => console.error("Error loading workouts:", error));
    }, []);

    return (
        <Container className='mt-5'>
            <Row xs={1} md={2} lg={3} className="g-4">
                {workouts.map((workout) => (
                    <Col key={workout.id} className="d-flex">
                        <Card className="flex-fill d-flex flex-column">
                            <Card.Body className="flex-grow-1">
                                <Card.Title>{workout.name}</Card.Title>
                                <Card.Text>Difficulty: {workout.difficulty}</Card.Text>
                                <Card.Text>Targeted Muscles: {workout.musclesTargeted.join(', ')}</Card.Text>
                            </Card.Body>
                                <Card.Footer className="mt-auto">
                                    <Card.Link href={workout.video} target="_blank">Watch Video</Card.Link>
                                </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
