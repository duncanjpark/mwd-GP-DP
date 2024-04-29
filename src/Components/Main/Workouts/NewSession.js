import React, { useEffect, useState } from "react";
import Parse from "parse";
import { getAllWorkouts } from "../../../Common/Services/WorkoutService";
import { Container, Row, Col, ButtonGroup, Button, ListGroup } from 'react-bootstrap';
import NewSessionModal from "./NewSessionModal";
import { createWorkoutSession } from "../../../Common/Services/WorkoutService";
import { useNavigate } from 'react-router-dom';

export default function NewSession() {

    const [personalWorkouts, setPersonalWorkouts] = useState([]);
    const [workoutTypes, setWorkoutTypes] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);
    // Add state for modal fields
    const [workoutId, setWorkoutId] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getAllWorkouts().then((workouts) => {
            console.log(workouts);
            setWorkoutTypes(workouts);
        });
    }, []);

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

    const resetForm = () => {
        setWorkoutId('');
        setSets('');
        setReps('');
        setWeight('');
    };

    const handleAddPersonalWorkout = () => {
        const workout = { workoutId, sets, reps, weight, name: workoutTypes.find(w => w.id === workoutId)?.get("name") };
        if (editIndex >= 0) {
            const updatedWorkouts = personalWorkouts.map((item, index) =>
                index === editIndex ? workout : item
            );
            setPersonalWorkouts(updatedWorkouts);
        } else {
            setPersonalWorkouts([...personalWorkouts, workout]);
        }
        setEditIndex(-1); // Reset edit index
        setModalShow(false);
        resetForm();
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
                    <Button variant="success" onClick={handleSubmitSession}>
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