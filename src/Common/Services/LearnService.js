import Parse from "parse";

export const getAllCars = () => {
  const Car = Parse.Object.extend("B4aVehicle");
  const query = new Parse.Query(Car);
  return query.find().then((results) => {
    // returns array of Lesson objects
    return results;
  });
};
