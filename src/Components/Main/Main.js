import React from "react";
import Parse from "parse";
import { Container, Card, CardGroup, Row, Col } from 'react-bootstrap';

export default function Main() {

    const cardsInfo = [
        { title: 'New Session', description: 'Log a new workout session here', url: '/new-session', img: 'img/newSession.jpg' },
        { title: 'Old Sessions', description: 'View old workout sessions', url: '/previous-sessions', img: 'img/oldSession.jpg' },
        { title: 'Learn Workouts', description: 'Learn a new workout', url: '/workouts', img: 'img/tutorial.jpg' },
        { title: 'Analytics', description: 'Gain data-based insights on your fitness progress', url: '/analytics', img: 'img/analytics.jpg' }
    ];

    return (
        <div className="main">
            <h3>Hello, {Parse.User.current()?.get('firstName')}</h3>
            <Container className="mt-5" style={{ maxWidth: '750px' }}>
                <Row>
                    <CardGroup>
                        {cardsInfo.map((card, index) => (
                            <Col>
                                <Card key={index} style={{ textAlign: 'center' }}>
                                    <Card.Img variant="top" src={card.img}></Card.Img>
                                    <Card.Body style={{minHeight:'200px'}}>
                                        <Card.Title>{card.title}</Card.Title>
                                        <Card.Text>{card.description}</Card.Text>
                                    </Card.Body>
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