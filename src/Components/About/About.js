import { useNavigate } from "react-router-dom"; // useHistory

export default function About() {
  const history = useNavigate();

  const buttonHandler = () => {
    history("/");
  };
  return (
    <section>
      <h1>Welcome to the About component</h1>
      <p>This is the About component</p>
      <button onClick={buttonHandler}>Home</button>
    </section>
  );
}
