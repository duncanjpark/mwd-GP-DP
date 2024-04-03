import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Child from "../Child/Child";
// Import function to fetch workouts and personal workouts.
import { getAllWorkoutsWithPersonalWorkouts } from "../../Common/Services/PersonalWorkoutService";
// Import function to log the user out
import { logoutUser } from "../Auth/AuthService";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  // Fetch workouts on component mount and update state.
  useEffect(() => {
    getAllWorkoutsWithPersonalWorkouts().then((workouts) => {
      console.log(workouts); // For debugging: logs fetched workouts.
      setWorkouts(workouts);
    });
  }, []);

  const handleLogout = () => {
    // When the logout is clicked, return to unauth main page
    logoutUser().then(() => {
      console.log("User has been logged out");
      navigate('/');
    });
  };

  return (
    <div>
      <h1>Chill Fitness</h1>
      <button onClick={handleLogout}>Logout</button><br></br>
      <Link to="/about">About</Link>
      {/* Pass fetched workouts to Child component */}
      <Child data={workouts} />
    </div>
  );
};
