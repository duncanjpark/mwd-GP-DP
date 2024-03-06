import Parse from "parse";

export const getAllWorkouts = () => {
  const Workout = Parse.Object.extend("Workout");
  const query = new Parse.Query(Workout);
  return query.find().then((results) => {
    return results;
  });
};

// The following service gets all workout types, and all corresponding individual workout instances
// Utilizes parse queries to format the 1-many relationship which will be passed to a child
export const getAllWorkoutsWithPersonalWorkouts = () => {
  const Workout = Parse.Object.extend("Workout");
  const query = new Parse.Query(Workout);
  
  return query.find().then(async (workouts) => {
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
  });
};
