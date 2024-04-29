import Parse from "parse";

export const getAllWorkouts = async () => {
    const Workout = Parse.Object.extend("Workout");
    const query = new Parse.Query(Workout);

    try {
        const results = await query.find();
        return results.map(workout => ({
            id: workout.id, // useful for key prop when rendering lists
            name: workout.get("name"),
            difficulty: workout.get("difficulty"),
            musclesTargeted: workout.get("musclesTargeted"), // Assuming this is stored as an array of strings
            video: workout.get("video")
        }));
    } catch (error) {
        console.error("Failed to fetch workouts: ", error);
        throw new Error("Unable to fetch workouts.");
    }
};
