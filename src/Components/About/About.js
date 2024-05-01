import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

// Component used to describe our website!
export default function About() {
    return (
        <Container className="my-5">
            <h1 className="mb-4">About Chill Fitness</h1>
            <p className="text-secondary">Welcome to the Chill Fitness App, designed to help you track and understand your fitness journey through data-driven insights. Built using React, our app offers interactive charts and visualizations to effectively monitor your progress.</p>
            <h2 className="mt-5">Key Features</h2>
            <ListGroup as="ul" className="mb-4">
                <ListGroup.Item as="li">Interactive fitness charts</ListGroup.Item>
                <ListGroup.Item as="li">Customizable data points</ListGroup.Item>
                <ListGroup.Item as="li">Historical data tracking</ListGroup.Item>
            </ListGroup>
            <h2 className="mt-5">Meet the Developers</h2>
            <p>This project was created by Duncan Park and George Perry, students in Professor Wicks' Modern Web Development course, passionate about leveraging technology to enhance fitness experiences.</p>
            <h2 className="mt-5">Our Inspiration</h2>
            <p>We started this project to fill a need for more intuitive and accessible fitness tracking tools, empowering users to achieve their personal health goals.</p>
            <h2 className="mt-5">Future Directions</h2>
            <p>We plan to introduce more personalized features, such as goal setting and real-time performance feedback, to make fitness tracking even more tailored and effective.</p>
            <h2 className="mt-5">Contact Us</h2>
            <p>Have feedback or questions? Reach out to us at dpark6@nd.edu or gperry@nd.edu.</p>
        </Container>
    );
}
