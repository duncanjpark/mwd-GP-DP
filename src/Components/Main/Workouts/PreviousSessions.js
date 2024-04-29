import React, { useEffect, useState } from 'react';
import { getUserSessions, getUserSessionDetail } from '../../../Common/Services/SessionService';
import { useNavigate } from 'react-router-dom';

import { ListGroup, Button, Accordion } from 'react-bootstrap';


export default function PreviousSessions() {
    const [sessions, setSessions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUserSessions().then((userSessions) => {
            // Promise.all to fetch details of each session
            Promise.all(userSessions.map(session => getUserSessionDetail(session.id)))
                .then(details => {
                    // Combine sessions with their details
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

    const handleSessionSelect = async (sessionId) => {
        try {
            const details = await getUserSessionDetail(sessionId);
            console.log(details)
            navigate(`/previous-sessions/${sessionId}`, { state: { sessionDetails: details } });
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
