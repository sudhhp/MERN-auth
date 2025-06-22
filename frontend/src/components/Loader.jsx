import { BounceLoader } from "react-spinners";
import React from "react";

const Loader = ({ color = "#36d7b7", size = 60 }) => {
  return <BounceLoader color={color} size={size} />;
};

export default Loader;
