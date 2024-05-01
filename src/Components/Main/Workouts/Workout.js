import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Form } from 'react-bootstrap';
import { getAllWorkouts } from '../../../Common/Services/WorkoutService';
import { getUniqueMusclesWorked } from '../../../Common/Services/WorkoutService';

// Component used to show details about each workout
export default function Workout() {

    // States used to keep track of all workouts and muscle filters
    const [workouts, setWorkouts] = useState([]);
    const [muscles, setMuscles] = useState([]);
    const [selectedMuscles, setSelectedMuscles] = useState([]);

    useEffect(() => {
        // Fetch unique muscles
        getUniqueMusclesWorked()
            .then(setMuscles)
            .catch(error => console.error("Error loading muscles:", error));

        // Fetch all workouts
        getAllWorkouts()
            .then(setWorkouts)
            .catch(error => console.error("Error loading workouts:", error));
    }, []);

    // If filters are selected, apply them here
    const filteredWorkouts = workouts.filter(workout => 
        selectedMuscles.length === 0 || workout.musclesTargeted.some(muscle => selectedMuscles.includes(muscle))
    );

    // Set the proper muscle filters
    const handleMuscleChange = (muscle, isChecked) => {
        setSelectedMuscles(prev => {
            if (isChecked && !prev.includes(muscle)) {
                return [...prev, muscle];
            } else if (!isChecked && prev.includes(muscle)) {
                return prev.filter(m => m !== muscle);
            }
            return prev;
        });
    };

    return (
        <Container className='mt-5 mb-5'>
            <Row>
                <h3>Filter by Muscles Worked:</h3>
            </Row>
            <Form>
                <Row>
                    {muscles.map(muscle => (
                        <Col xs={6} md={4} lg={3} key={muscle}>
                            <Form.Check
                                inline
                                key={muscle}
                                type="checkbox"
                                id={`muscle-${muscle}`}
                                label={muscle}
                                onChange={(e) => handleMuscleChange(muscle, e.target.checked)}
                                checked={selectedMuscles.includes(muscle)}
                            />
                        </Col>
                    ))}
                </Row>
            </Form>
            <Row xs={1} md={2} lg={3} className="g-4 mt-2">
                {filteredWorkouts.map((workout) => (
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
