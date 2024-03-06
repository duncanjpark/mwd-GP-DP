import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllWorkouts } from "../../Common/Services/WorkoutService";
import { getAllWorkoutsWithPersonalWorkouts } from "../../Common/Services/WorkoutService";
import Child from "../Child/Child";

export default function Main() {
  const [workouts, setWorkouts] = useState([]);

  // Use the service to get all the workout class objects
  useEffect(() => {
    getAllWorkoutsWithPersonalWorkouts().then((cars) => {
      console.log(cars);
      setWorkouts(cars);
    });
  }, []);

  return (
    <div>
      <h1>Chill Fitness</h1>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
      <Child data={workouts} />
    </div>
  );
};