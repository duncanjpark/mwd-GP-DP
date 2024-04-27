import React, { useEffect, useState } from "react";
import Child from "../Child/Child";
import Parse from "parse";
// Import function to fetch workouts and personal workouts.
import { getAllWorkoutsWithPersonalWorkouts } from "../../Common/Services/PersonalWorkoutService";

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
    <div className="main">
      {/* Display a header and subheader for context */}
      <h3>Hello, {Parse.User.current()?.get('firstName')}</h3>
      Get started by entering a workout here
      

      {/* Pass fetched workouts to Child component */}
      <Child data={workouts} />
    </div>
  );
};
