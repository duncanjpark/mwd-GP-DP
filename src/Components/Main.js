import React, { useEffect, useState } from "react";
import { getAllCars } from "../Common/Services/LearnService";
import Child from "./Child";

const Main = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    getAllCars().then((cars) => {
      console.log(cars);
      setCars(cars);
    });
  }, []);

  return (
    <div>
      This is the main stateful parent component.
      <Child data={cars} />
    </div>
  );
};

export default Main;
