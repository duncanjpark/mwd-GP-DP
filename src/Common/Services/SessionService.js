import Parse from "parse";

// Function to create a workout session for a user with given workouts
export const createWorkoutSession = async (userId, personalWorkouts) => {
    // Extend Parse.Object for required classes
    const WorkoutSession = Parse.Object.extend("WorkoutSession");
    const PersonalWorkout = Parse.Object.extend("PersonalWorkout");
    const User = Parse.Object.extend("_User");
    const Workout = Parse.Object.extend("Workout");

    // Create a new WorkoutSession object and set its attributes
    const session = new WorkoutSession();
    session.set("UserSession", User.createWithoutData(userId));
    session.set("sessionDate", new Date());

    try {
        await session.save();  // Save the session first to obtain an objectId
        // Map each personalWorkouts to save PersonalWorkout objects linked to the session
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
        session.set("PersonalWorkouts", savedWorkouts);
        await session.save(); // Save the session again with all PersonalWorkouts linked
        return getUserSessionDetail(session.id); // Fetch detailed session info in proper format
    } catch (error) {
        console.error("Error creating workout session and personal workouts: ", error);
        throw new Error("Failed to create workout session and personal workouts.");
    }
};

// Function to get all workout sessions for the current user
export const getUserSessions = async () => {
    const currentUser = Parse.User.current();
    if (!currentUser) {
        throw new Error("No authenticated user found");
    }

    const WorkoutSession = Parse.Object.extend("WorkoutSession");
    const query = new Parse.Query(WorkoutSession);
    query.equalTo("UserSession", currentUser); // Filter sessions by current user

    try {
        const results = await query.find();
        return results.map(session => ({
            id: session.id,
            date: session.get("sessionDate").toISOString(),
        }));
    } catch (error) {
        console.error("Error fetching user sessions: ", error);
        throw new Error("Failed to fetch user sessions.");
    }
};

// Function to get detailed + formatted information about a specific session
export const getUserSessionDetail = async (sessionId) => {
    const currentUser = Parse.User.current();
    if (!currentUser) {
        throw new Error("No authenticated user found");
    }

    const WorkoutSession = Parse.Object.extend("WorkoutSession");
    const query = new Parse.Query(WorkoutSession);
    query.equalTo("objectId", sessionId); // Filter by session ID
    query.equalTo("UserSession", currentUser); // Ensure the session belongs to the current user
    query.include("PersonalWorkouts", "PersonalWorkouts.Workout"); // Include related fields

    try {
        const session = await query.first();
        if (!session) {
            throw new Error("Session not found or access denied");
        }

        const personalWorkouts = session.get("PersonalWorkouts") || [];
        return {
            id: session.id,
            date: session.get("sessionDate").toISOString(),
            personalWorkouts: personalWorkouts.map(pw => ({
                id: pw.id,
                name: pw.get("Workout").get("name"),
                reps: pw.get("reps"),
                sets: pw.get("sets"),
                weight: pw.get("weight"),
                musclesTargeted: pw.get("Workout").get("musclesTargeted")
            }))
        };
    } catch (error) {
        console.error("Error fetching session details: ", error);
        throw new Error("Failed to fetch session details.");
    }
};