import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Parse from "parse";
import { Container, Row, Col, ButtonGroup, Button, ListGroup } from 'react-bootstrap';
import NewSessionModal from "./NewSessionModal";
import { createWorkoutSession } from "../../../Common/Services/SessionService";
import { getAllWorkouts } from "../../../Common/Services/WorkoutService";

// Stateful parent component used to add a new workout session
export default function NewSession() {
    // States used for listing workouts, modal logic
    const [personalWorkouts, setPersonalWorkouts] = useState([]);
    const [workoutTypes, setWorkoutTypes] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    // editIndex is used to point to a current workout and ensure proper editing/resaving/deleting
    const [editIndex, setEditIndex] = useState(-1);
    // Add state for modal fields
    const [workoutId, setWorkoutId] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');

    const navigate = useNavigate();

    // Fetch workout types on component mount
    useEffect(() => {
        getAllWorkouts().then((workouts) => {
            console.log(workouts);
            setWorkoutTypes(workouts);
        });
    }, []);

    // Populate or reset form when editing or closing the modal
    useEffect(() => {
        if (editIndex >= 0 && personalWorkouts[editIndex]) {
            const workout = personalWorkouts[editIndex];
            setWorkoutId(workout.workoutId);
            setSets(workout.sets);
            setReps(workout.reps);
            setWeight(workout.weight);
        } else {
            resetForm();
        }
    }, [editIndex, personalWorkouts, modalShow]);

    // Clear the modal fields
    const resetForm = () => {
        setWorkoutId('');
        setSets('');
        setReps('');
        setWeight('');
    };

    // Function to handle adding or updating a personal workout
    const handleAddPersonalWorkout = () => {
        const workout = { workoutId, sets, reps, weight, name: workoutTypes.find(w => w.id === workoutId)?.name };
        // editIndex signifies a workout edit - instead of adding a new workout, re-save with edits
        if (editIndex >= 0) {
            const updatedWorkouts = personalWorkouts.map((item, index) =>
                index === editIndex ? workout : item
            );
            setPersonalWorkouts(updatedWorkouts);
        // Otherwise, combine the arrays with the new workout
        } else {
            setPersonalWorkouts([...personalWorkouts, workout]);
        }
        setEditIndex(-1); // Reset edit index
        setModalShow(false);
        resetForm();
    };

    // Delete a workout from the list
    const handleDeleteWorkout = (index) => {
        const updatedWorkouts = personalWorkouts.filter((_, i) => i !== index);
        setPersonalWorkouts(updatedWorkouts);
    };

    // Edit a workout
    const handleEditWorkout = (index) => {
        setEditIndex(index); // Set index of workout being edited
        setModalShow(true);  // Show the modal for editing
    };

    // Submit/save the new session
    const handleSubmitSession = () => {
        createWorkoutSession(Parse.User.current().id, personalWorkouts)
            .then(session => {
                console.log('Session saved successfully!', session);
                // Redirect to previous session detail view
                navigate(`/previous-sessions/${session.id}`, { state: { sessionDetails: session } });
            })
            .catch(error => {
                console.error('Failed to save session:', error);
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
                    <Button variant="success" onClick={handleSubmitSession} disabled={personalWorkouts.length === 0}>
                        Submit Session
                    </Button>
                </Col>
                <NewSessionModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onSave={handleAddPersonalWorkout}
                    workoutTypes={workoutTypes}
                    workoutId={workoutId}
                    setWorkoutId={setWorkoutId}
                    sets={sets}
                    setSets={setSets}
                    reps={reps}
                    setReps={setReps}
                    weight={weight}
                    setWeight={setWeight}
                />
            </Row>
            <Row className="m-auto w-75 justify-content-center" style={{ textAlign: 'left' }}>
                <ListGroup>
                    {personalWorkouts.map((workout, index) => (
                        <ListGroup.Item key={index}>
                            <Row>
                                <Col style={{alignContent:'center'}}><strong>{workout.name}</strong> - {workout.weight} lbs. for {workout.sets} sets of {workout.reps} reps</Col>
                                <Col style={{ textAlign: 'right' }}>
                                    <ButtonGroup >
                                        <Button size="sm" variant="info" onClick={() => handleEditWorkout(index)}>
                                            Edit
                                        </Button>
                                        <Button size="sm" variant="danger" onClick={() => handleDeleteWorkout(index)}>
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