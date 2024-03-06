import Parse from "parse";

export const getAllWorkouts = () => {
  const Workout = Parse.Object.extend("Workout");
  const query = new Parse.Query(Workout);
  return query.find().then((results) => {
    return results;
  });
};
