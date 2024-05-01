import React from "react";
import Parse from "parse"; // Import Parse for user data management
import { Container, Card, CardGroup, Row, Col } from 'react-bootstrap'; // Import Bootstrap components for layout and styling

// Component used as a main dashboard for authenticated users
export default function Main() {

    // Data for the dashboard cards
    const cardsInfo = [
        { title: 'New Session', description: 'Log a new workout session here', url: '/new-session', img: 'img/newSession.jpg' },
        { title: 'Old Sessions', description: 'View old workout sessions', url: '/previous-sessions', img: 'img/oldSession.jpg' },
        { title: 'Learn Workouts', description: 'Learn a new workout', url: '/workouts', img: 'img/tutorial.jpg' },
        { title: 'Analytics', description: 'Gain data-based insights on your fitness progress', url: '/analytics', img: 'img/analytics.jpg' }
    ];

    return (
        <div className="main">
            {/* Display greeting using user's first name fetched from Parse */}
            <h3>Hello, {Parse.User.current()?.get('firstName')}</h3>
            {/* Container to center the card group */}
            <Container className="mt-5" style={{ maxWidth: '750px' }}>
                {/* Row to wrap the card group */}
                <Row>
                    {/* Bootstrap card group for layout and styling */}
                    <CardGroup>
                        {/* Map through cardsInfo to dynamically create cards */}
                        {cardsInfo.map((card, index) => (
                            <Col key={index}>
                                {/* Card for each dashboard section */}
                                <Card style={{ textAlign: 'center' }}>
                                    {/* Image at the top of the card */}
                                    <Card.Img variant="top" src={card.img}></Card.Img>
                                    {/* Card body contains the title and description */}
                                    <Card.Body style={{minHeight:'200px'}}>
                                        <Card.Title>{card.title}</Card.Title>
                                        <Card.Text>{card.description}</Card.Text>
                                    </Card.Body>
                                    {/* Card footer with a link to the associated page */}
                                    <Card.Footer style={{height:'75px', alignContent:'center'}}>
                                        <Card.Link href={card.url}>Go to {card.title}</Card.Link>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </CardGroup>
                </Row>
            </Container>
        </div>
    );
};
