import { useNavigate } from "react-router-dom";

export default function About() {
  const history = useNavigate();

  const buttonHandler = () => {
    history("/");
  };
  return (
    // A more detailed about section will be added at a later date
    <section>
      <p>This is the About component</p>
    </section>
  );
}