import React from "react";
import { Link } from "react-router-dom";

const Landing: React.FC = () => {
  return (
    <div>
      <h1>Landing page</h1>
      <Link to={"/dashboard"}>LOGIN</Link>
    </div>
  );
};

export default Landing;
