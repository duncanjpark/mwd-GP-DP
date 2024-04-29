import React, { useEffect, useState } from "react";
import Parse from "parse";
import { getAllWorkouts } from "../../../Common/Services/WorkoutService";
import { Container, Row, Col, ButtonGroup, Button, ListGroup } from 'react-bootstrap';
import NewSessionModal from "./NewSessionModal";
import { createWorkoutSession } from "../../../Common/Services/WorkoutService";

export default function NewSession() {

    const [personalWorkouts, setPersonalWorkouts] = useState([]);
    const [workoutTypes, setWorkoutTypes] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);

    useEffect(() => {
        getAllWorkouts().then((workouts) => {
            console.log(workouts);
            setWorkoutTypes(workouts);
        });
    }, []);

    const handleAddPersonalWorkout = (workout) => {
        if (editIndex >= 0) {
            // Editing an existing workout
            const updatedWorkouts = personalWorkouts.map((item, index) =>
                index === editIndex ? workout : item
            );
            setPersonalWorkouts(updatedWorkouts);
            setEditIndex(-1); // Reset edit index
        } else {
            // Adding a new workout
            setPersonalWorkouts([...personalWorkouts, workout]);
        }
    };

    const handleDeleteWorkout = (index) => {
        const updatedWorkouts = personalWorkouts.filter((_, i) => i !== index);
        setPersonalWorkouts(updatedWorkouts);
    };

    const handleEditWorkout = (index) => {
        setEditIndex(index); // Set index of workout being edited
        setModalShow(true);  // Show the modal for editing
    };

    const handleSubmitSession = () => {
        createWorkoutSession(Parse.User.current().id, personalWorkouts)
            .then(session => {
                console.log('Session saved successfully!', session);
                // You could redirect the user or clear the form here
            })
            .catch(error => {
                console.error('Failed to save session:', error);
                // Handle errors, possibly update UI to notify user
            });
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center mb-5" style={{ textAlign: 'center' }}>
                <h4>Add individual workouts using the button below. Once complete, click Submit</h4>
            </Row>
            <Row className="mb-5" style={{ textAlign: 'center' }}>
                <Col>
                    <Button variant="primary" onClick={() => setModalShow(true)}>
                        Add Workout
                    </Button>
                </Col>
                <Col>
                    <Button variant="success" onClick={handleSubmitSession}>
                        Submit Session
                    </Button>
                </Col>
                <NewSessionModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onSave={handleAddPersonalWorkout}
                    workoutTypes={workoutTypes}
                    workoutData={editIndex >= 0 ? personalWorkouts[editIndex] : null}
                />
            </Row>
            <Row className="m-auto w-75 justify-content-center" style={{ textAlign: 'left' }}>
                <ListGroup>
                    {personalWorkouts.map((workout, index) => (
                        <ListGroup.Item key={index}>
                            <Row>
                                <Col><strong>{workout.name}</strong> - {workout.weight} lbs. for {workout.sets} sets of {workout.reps} reps</Col>
                                <Col style={{ textAlign: 'right' }}>
                                    <ButtonGroup>
                                        <Button className="ml-1" variant="info" onClick={() => handleEditWorkout(index)}>
                                            Edit
                                        </Button>
                                        <Button className="ml-1" variant="danger" onClick={() => handleDeleteWorkout(index)}>
                                            Delete
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Row>
        </Container>
    );
};