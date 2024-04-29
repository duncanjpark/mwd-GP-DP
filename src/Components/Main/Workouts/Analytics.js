import React, { useEffect, useState } from 'react';
import { getUserSessions, getUserSessionDetail } from '../../../Common/Services/SessionService';
import { Dropdown } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Analytics() {
    const [sessions, setSessions] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState('');
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        getUserSessions().then((data) => {
            setSessions(data);
        });
    }, []);

    useEffect(() => {
        if (selectedWorkout) {
            const filteredData = sessions.flatMap(session => 
                session.personalWorkouts.filter(workout => workout.name === selectedWorkout)
            );
            const chartLabels = filteredData.map(workout => new Date(workout.date).toLocaleDateString());
            const chartWeights = filteredData.map(workout => workout.weight);

            setChartData({
                labels: chartLabels,
                datasets: [{
                    label: 'Weight over time',
                    data: chartWeights,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                }]
            });
        }
    }, [selectedWorkout, sessions]);

    const handleSelectWorkout = (eventKey) => {
        setSelectedWorkout(eventKey);
    };

    // Extract unique workout types for the dropdown
    const workoutTypes = Array.from(new Set(sessions.flatMap(session => session.personalWorkouts.map(workout => workout.name))));

    return (
        <div>
            <h1>Workout Progress Analytics</h1>
            <Dropdown onSelect={handleSelectWorkout}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedWorkout || "Select a Workout"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {workoutTypes.map((type, index) => (
                        <Dropdown.Item key={index} eventKey={type}>{type}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            {selectedWorkout && <Line data={chartData} />}
        </div>
    );
}
