import Parse from "parse";
import { getAllWorkouts } from "./WorkoutService.js";

// The following service gets all workout types, and all corresponding individual workout instances
// Utilizes parse queries to format the 1-many relationship which will be passed to a child
export const getAllWorkoutsWithPersonalWorkouts = async () => {
    // Use getAllWorkouts to fetch all workout objects
    const workouts = await getAllWorkouts();
    
    const workoutsWithPersonal = await Promise.all(workouts.map(async (workout) => {
        const PersonalWorkout = Parse.Object.extend("PersonalWorkout");
        const personalQuery = new Parse.Query(PersonalWorkout);
        personalQuery.equalTo("workout", workout);
        
        const personalWorkouts = await personalQuery.find();
        return {
            workout,
            personalWorkouts,
        };
    }));

    return workoutsWithPersonal;
};