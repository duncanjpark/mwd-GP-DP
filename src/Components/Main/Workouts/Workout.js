import React, { useEffect, useState } from 'react';
import { Container, Card, CardGroup } from 'react-bootstrap';

export default function Workout() {

    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        getAllWorkouts()
            .then(setWorkouts)
            .catch(error => console.error("Error loading workouts:", error));
    }, []);


    return (
        <div>
            o
        </div>
    );
};
