import { useNavigate } from "react-router-dom";

export default function About() {
  const history = useNavigate();

  const buttonHandler = () => {
    history("/");
  };
  return (
    // A more detailed about section will be added at a later date
    <section>
      <h1>Welcome to the About component</h1>
      <p>This is the About component</p>
      <button onClick={buttonHandler}>Home</button>
    </section>
  );
}
