import React, { useEffect, useState } from 'react';
import { getUserSessions, getUserSessionDetail } from '../../../Common/Services/SessionService';
import { Dropdown } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
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
            // Map through each session to find workouts that match the selected type
            // and create an array of { date, weight } objects for those workouts.
            const workoutData = sessions.flatMap(session => 
                session.personalWorkouts
                  .filter(workout => workout.name === selectedWorkout)
                  .map(workout => ({
                    date: session.date,
                    weight: workout.weight,
                    reps: workout.reps
                  }))
              );
            console.log('Workout data with session dates:', workoutData);
            
            // Sort workoutData by date to ensure the chart shows a proper timeline.
            workoutData.sort((a, b) => new Date(a.date) - new Date(b.date));
            
            const chartLabels = workoutData.map(data => new Date(data.date).toLocaleDateString());
            const chartWeights = workoutData.map(data => data.weight);
            const chartReps = workoutData.map(data => data.reps);

            const newChartData = {
              labels: chartLabels,
              datasets: [
                {
                  label: 'Weight over time',
                  data: chartWeights,
                  borderColor: 'rgb(75, 192, 192)',
                  backgroundColor: 'rgba(75, 192, 192, 0.5)',
                  yAxisID: 'y', // Link to the first y-axis
                },
                {
                  label: 'Reps over time',
                  data: chartReps,
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  yAxisID: 'y1', // Link to the second y-axis
                },
              ],
            };
    
            //console.log('New Chart data:', newChartData);
            setChartData(newChartData);
        }
        console.log('Chart data:', chartData);
    }, [selectedWorkout, sessions]);
    

    const handleSelectWorkout = (eventKey) => {
        setSelectedWorkout(eventKey);
    };

    useEffect(() => {
        console.log('Chart data has been set:', chartData);
      }, [chartData]);
      

    // Extract unique workout types for the dropdown
    const workoutTypes = Array.from(new Set(sessions.flatMap(session => session.personalWorkouts.map(workout => workout.name))));
    //console.log('Chart data before rendering:', chartData);

    const options = {
        responsive: true,
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              text: 'Weight (lbs)',
              display: true,
            },
          },
          y1: { // This defines the second y-axis
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false,
            },
            title: {
              text: 'Reps',
              display: true,
            },
          },
        },
      };



    return (
        <Container fluid="lg">
            <Row className="mb-4">
                <Col>
                    <h1>Workout Progress Analytics</h1>
                </Col>
            </Row>
            <Row>
                <Col md={4} lg={3}>
                    <Dropdown onSelect={handleSelectWorkout}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {selectedWorkout || "Select a Workout"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {workoutTypes.map((type, index) => (
                                <Dropdown.Item key={index} eventKey={type}>
                                    {type}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <div style={{ height: '600px' }}>
                        {selectedWorkout && chartData.datasets && chartData.datasets.length > 0 ? (
                            <Line options={options} data={chartData} />
                        ) : (
                            <p>Please select a workout type!</p>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
