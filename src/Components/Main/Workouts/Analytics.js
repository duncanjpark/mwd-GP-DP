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
        //console.log('Chart data:', chartData);
    }, [selectedWorkout, sessions]);

    const handleSelectWorkout = (eventKey) => {
        setSelectedWorkout(eventKey);
    };

    console.log('sessions :', sessions);
    // Extract unique workout types for the dropdown
    const workoutTypes = Array.from(new Set(sessions.flatMap(session => session.personalWorkouts.map(workout => workout.name))));
    console.log('workouttypes data:', workoutTypes);

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
