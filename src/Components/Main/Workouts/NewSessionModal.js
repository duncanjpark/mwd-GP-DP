import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';

export default function NewSessionModal({ show, onHide, onSave, workoutTypes, workoutData }) {

    // Manage local state for UI
    const [workoutId, setWorkoutId] = useState('');  // Use typeId to store the ID of the workout
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');

    useEffect(() => {
        if (workoutData && show) {
            setWorkoutId(workoutData.workoutId);
            setSets(workoutData.sets);
            setReps(workoutData.reps);
            setWeight(workoutData.weight);
        } else {
            // Reset state when not editing
            resetForm();
        }
    }, [workoutData, show]);

    const saveWorkout = () => {
        const workoutType = workoutTypes.find(workout => workout.id === workoutId);
        onSave({ workoutId, name: workoutType.get("name"), sets, reps, weight });
        onHide();
        resetForm(); // Reset form after saving
    };

    const resetForm = () => {
        setWorkoutId('');
        setSets('');
        setReps('');
        setWeight('');
    };

    const isFormValid = workoutId && sets && reps && weight;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Personal Workout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Workout Name</Form.Label>
                        <Form.Control as="select" value={workoutId} onChange={e => setWorkoutId(e.target.value)}>
                            <option value="">Select a Workout Name</option>
                            {workoutTypes.map((workout, key) => (
                                <option key={key} value={workout.id}>{workout.get("name")}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            value={weight}
                            onChange={e => setWeight(e.target.value)}
                            placeholder="Enter weight"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Sets</Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            value={sets}
                            onChange={e => setSets(e.target.value)}
                            placeholder="Enter number of sets"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Reps</Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            value={reps}
                            onChange={e => setReps(e.target.value)}
                            placeholder="Enter number of reps"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={saveWorkout} disabled={!isFormValid}>Save Workout</Button>
            </Modal.Footer>
        </Modal>
    );
};