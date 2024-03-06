import Parse from "parse";
import { getAllWorkouts } from "./WorkoutService.js"; // Reuse getAllWorkouts to fetch all workouts.

// The following service gets all workout types, and all corresponding individual workout instances
// Utilizes parse queries to format the 1-many relationship which will be passed to a child
export const getAllWorkoutsWithPersonalWorkouts = async () => {
    const workouts = await getAllWorkouts(); // Fetch all workouts.
    
    const workoutsWithPersonal = await Promise.all(workouts.map(async (workout) => {
        const PersonalWorkout = Parse.Object.extend("PersonalWorkout");
        const personalQuery = new Parse.Query(PersonalWorkout);
        personalQuery.equalTo("workout", workout); // Find personal workouts related to this workout.
        
        const personalWorkouts = await personalQuery.find(); // Fetch related personal workouts.
        return { workout, personalWorkouts }; // Combine workout with its personal workouts.
    }));

    return workoutsWithPersonal; // Return combined data.
};
