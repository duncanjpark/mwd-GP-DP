import Parse from "parse";

export const getAllWorkouts = () => {
    // Extend the Parse.Object to create a Workout class
    const Workout = Parse.Object.extend("Workout");
    // Create a new query object to search for all instances of the Workout class.
    const query = new Parse.Query(Workout);
    // Use the find method to fetch all Workout objects from the server
    return query.find().then((results) => {
        return results;
    });
};

export const createWorkoutSession = async (userId, personalWorkouts) => {
    console.log(userId)
    const WorkoutSession = Parse.Object.extend("WorkoutSession");
    const PersonalWorkout = Parse.Object.extend("PersonalWorkout");
    const User = Parse.Object.extend("_User");
    const Workout = Parse.Object.extend("Workout");

    const session = new WorkoutSession();
    session.set("UserSession", User.createWithoutData(userId));
    session.set("sessionDate", new Date());

    console.log(session)

    try {
        await session.save();  // Save the session first to obtain an objectId

        // Prepare to save each PersonalWorkout linked to the session and a Workout object
        const workoutPromises = personalWorkouts.map(workoutData => {
            const personalWorkout = new PersonalWorkout();
            personalWorkout.set("Workout", Workout.createWithoutData(workoutData.workoutId));
            personalWorkout.set("reps", parseInt(workoutData.reps, 10));
            personalWorkout.set("sets", parseInt(workoutData.sets, 10));
            personalWorkout.set("weight", parseInt(workoutData.weight, 10));
            personalWorkout.set("Session", session);  // Link to the WorkoutSession object

            return personalWorkout.save();
        });

        // Save all PersonalWorkout objects and wait for them to complete
        const savedWorkouts = await Promise.all(workoutPromises);

        // Optionally link back the saved PersonalWorkouts to the session if needed
        session.set("PersonalWorkouts", savedWorkouts);
        await session.save();

        return { session, savedWorkouts };  // Return the saved session and workouts
    } catch (error) {
        console.error("Error creating workout session and personal workouts: ", error);
        throw new Error("Failed to create workout session and personal workouts.");
    }
};


