export default function Child({ data }) {
    const formatDate = (date) => {
        return date.toLocaleDateString("en-US", {
            month: 'long', day: 'numeric', year:'numeric'
          });
        };
        
    return (
      <div>
        <h3>This is the main list stateless child component.</h3>
        <h4>The workout class objects are displayed below</h4>
        {data.map((item, index) => (
          <div key={index}>
            {item.workout.get("name")}
            <ul>
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