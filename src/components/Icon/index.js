import React from "react";
import Arrow from "./icons/Arrow";
import LinkedIn from "./icons/LinkedIn";
import GitHub from "./icons/GitHub";
import Twitter from "./icons/Twitter";
import Codepen from "./icons/Codepen";

const icons = {
  "arrow": <Arrow/>,
  "linked-in": <LinkedIn/>,
  "github": <GitHub/>,
  "twitter": <Twitter/>,
  "codepen": <Codepen/>
};

const Icon = ({ icon, ...props }) => {
  return <div {...props}>{icons[icon]}</div>;
};

export default Icon;