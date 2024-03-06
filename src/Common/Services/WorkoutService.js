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

