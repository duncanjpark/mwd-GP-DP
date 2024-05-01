import Parse from "parse";

// Function to retrieve all workouts from the database
export const getAllWorkouts = async () => {
    const Workout = Parse.Object.extend("Workout"); // Define Workout class
    const query = new Parse.Query(Workout); // Create a query for Workout objects

    try {
        const results = await query.find(); // Execute the query to fetch all workouts
        return results.map(workout => ({
            id: workout.id,
            name: workout.get("name"),
            difficulty: workout.get("difficulty"),
            musclesTargeted: workout.get("musclesTargeted"),
            video: workout.get("video")
        }));
    } catch (error) {
        console.error("Failed to fetch workouts: ", error);
        throw new Error("Unable to fetch workouts.");
    }
};

// Function to retrieve a list of unique muscles targeted by all workouts
export const getUniqueMusclesWorked = async () => {
    const Workout = Parse.Object.extend("Workout"); // Define Workout class
    const query = new Parse.Query(Workout); // Create a query for Workout objects
    query.select("musclesTargeted"); // Only retrieve the 'musclesTargeted' field

    try {
        const results = await query.find();
        // Flatten the list of muscles from all workouts and remove duplicates to get unique muscles
        const allMuscles = results.flatMap(workout => workout.get("musclesTargeted") || []);
        const uniqueMuscles = [...new Set(allMuscles)];
        return uniqueMuscles.sort();
    } catch (error) {
        console.error("Error fetching unique muscles: ", error);
        throw new Error("Failed to fetch unique muscles.");
    }
};