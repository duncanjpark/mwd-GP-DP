import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Import function to fetch workouts and personal workouts.
import { getAllWorkoutsWithPersonalWorkouts } from "../../Common/Services/PersonalWorkoutService";
import Child from "../Child/Child";

export default function Main() {
  const [workouts, setWorkouts] = useState([]);

  // Fetch workouts on component mount and update state.
  useEffect(() => {
    getAllWorkoutsWithPersonalWorkouts().then((workouts) => {
      console.log(workouts); // For debugging: logs fetched workouts.
      setWorkouts(workouts);
    });
  }, []);

  return (
    <div>
      <h1>Chill Fitness</h1>
      {/* Navigation links */}
      <ul>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
      {/* Pass fetched workouts to Child component */}
      <Child data={workouts} />
    </div>
  );
};
