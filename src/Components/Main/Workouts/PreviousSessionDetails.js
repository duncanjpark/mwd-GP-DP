import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useParams, Navigate } from 'react-router-dom';

export default function PreviousSessionDetails() {

    const location = useLocation();
    const { sessionId } = useParams();
    const sessionDetails = location.state?.sessionDetails;

    if (!sessionDetails) {
        // Optionally fetch the details again or redirect
        return <Navigate to="/previous-sessions" />;
    }

    return (
        <div>
            <h1>Session Details for {new Date(sessionDetails.date).toLocaleDateString()}</h1>
            {sessionDetails.personalWorkouts.map(workout => (
                <div key={workout.id}>
                    <p>{workout.name}: {workout.sets} sets of {workout.reps} reps at {workout.weight} lbs</p>
                </div>
            ))}
        </div>
    );
}
