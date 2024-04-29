import React, { useEffect, useState } from 'react';
import { getUserSessions, getUserSessionDetail } from '../../../Common/Services/WorkoutService';
import { useNavigate } from 'react-router-dom';

export default function PreviousSessions() {
    const [sessions, setSessions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUserSessions().then((userSessions) => {
            setSessions(userSessions.map(session => ({
                ...session,
                date: session.date ? new Date(session.date).toLocaleDateString() : 'No date' // Converts Date to a string
            })));
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
            {sessions.map(session => (
                <div key={session.id} onClick={() => handleSessionSelect(session.id)}>
                    {session.date}
                </div>
            ))}
        </div>
    );
}
