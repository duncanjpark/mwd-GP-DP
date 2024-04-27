import Parse from "parse";

export default function Child({ data }) {
  // Helper function to format dates.
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: 'long', day: 'numeric', year:'numeric'
    });
  };
  
  return (
    <div>
      <h4>The workout class objects are displayed below</h4>
      {/* Iterate over the workout data to display each item */}
      {data.map((item, index) => (
        <div key={index}>
          {item.workout.get("name")}
          <ul>
            {/* Display details for each personal workout */}
            {item.personalWorkouts.map((pw, pwIndex) => (
              <li key={pwIndex}>
                Date: {formatDate(pw.get("createdAt"))}, Reps: {pw.get("reps")}, Sets: {pw.get("sets")}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
