import React from "react";
import { Modal, Button, Form } from 'react-bootstrap';

// Stateless child component to render a popup modal for adding workout info
export default function NewSessionModal({ show, onHide, onSave, workoutTypes, workoutId, setWorkoutId, sets, setSets, reps, setReps, weight, setWeight }) {

    // Flag variable to prevent submission until required fields are filled
    const isFormValid = workoutId && sets && reps && weight;

    return (
        // Bootstrap Modal component to show or hide the modal
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Personal Workout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Form for adding workout details */}
                <Form>
                    {/* Workout Name Selection */}
                    <Form.Group className="mb-3">
                        <Form.Label>Workout Name</Form.Label>
                        <Form.Control as="select" value={workoutId} onChange={e => setWorkoutId(e.target.value)}>
                            {/* Default option for selection */}
                            <option value="">Select a Workout Name</option>
                            {/* Dynamically populate workout options */}
                            {workoutTypes.map((workout, key) => (
                                <option key={key} value={workout.id}>{workout.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    {/* Weight Input */}
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
                    {/* Sets Input */}
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
                    {/* Reps Input */}
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
            {/* Footer buttons for closing or saving the workout */}
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={onSave} disabled={!isFormValid}>Save Workout</Button>
            </Modal.Footer>
        </Modal>
    );
};
