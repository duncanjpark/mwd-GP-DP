import './App.css'; // Importing global styles for the app.
import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import Components from "./Components/Components"; // Import main UI components.
import * as Env from "./environments"; // Import environment-specific configurations.
import Parse from "parse";
// Initialize Parse server with environment variables for backend operations.
Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  return <Components />; // Render the main component.
}

export default App; // Export App component for use in the project.
