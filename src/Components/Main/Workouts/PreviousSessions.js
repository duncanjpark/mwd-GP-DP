import React, { useEffect, useState } from 'react';
import { getUserSessions, getUserSessionDetail } from '../../../Common/Services/SessionService';
import { useNavigate } from 'react-router-dom';
import { ListGroup, Button, Accordion } from 'react-bootstrap';

// Component to display previous workout sessions
export default function PreviousSessions() {
    const [sessions, setSessions] = useState([]);
    const navigate = useNavigate();

    // Fetch all sessions and their details on component mount
    useEffect(() => {
        getUserSessions().then((userSessions) => {
            Promise.all(userSessions.map(session => getUserSessionDetail(session.id)))
                .then(details => {
                    // Combine sessions with their detailed, formatted info
                    const detailedSessions = userSessions.map((session, index) => ({
                        ...session,
                        date: session.date ? new Date(session.date).toLocaleDateString() : 'No date',
                        personalWorkouts: details[index].personalWorkouts
                    }));
                    setSessions(detailedSessions);
                })
                .catch(error => {
                    console.error('Failed to fetch session details:', error);
                });
        });
    }, []);

    // Handle navigation to session details
    const handleSessionSelect = async (sessionId) => {
        try {
            navigate(`/previous-sessions/${sessionId}`);
        } catch (error) {
            console.error('Failed to fetch session details:', error);
        }
    };

    return (
        <div>
            <Accordion defaultActiveKey="0">
                {sessions.map((session, index) => (
                    <Accordion.Item eventKey={index.toString()} key={session.id}>
                        <Accordion.Header>
                            Session on {session.date}
                        </Accordion.Header>
                        <Accordion.Body>
                            <ListGroup>
                                {session.personalWorkouts?.map((workout, wIndex) => (
                                    <ListGroup.Item key={wIndex}>
                                        <strong>{workout.name}</strong> - {workout.weight} lbs for {workout.sets} sets of {workout.reps} reps
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <Button className="mt-3" variant="primary" onClick={() => handleSessionSelect(session.id)}>
                                View Details
                            </Button>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
}