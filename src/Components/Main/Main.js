import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCars } from "../../Common/Services/LearnService";
import Child from "../Child/Child";

export default function Main() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    getAllCars().then((cars) => {
      console.log(cars);
      setCars(cars);
    });
  }, []);

  return (
    <div>
      <h1>Chill Fitness</h1>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
      <Child data={cars} />
    </div>
  );
};