import React from "react";
import { Link } from "react-router-dom";
import Auth
 from "../Auth/Auth";
export default function MainUnauth() {

// This page will be redirected to when the user is unauthenticated
  return (
    <div>
      <h1>Chill Fitness</h1>
      <Link to="/about">About</Link>
      <Auth />
    </div>
  );
};
