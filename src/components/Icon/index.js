import React from "react";

const Icon = ({ icon,  ...props }) => {
  const svg = require(`!raw-loader!./icons/${icon}.svg`);
  return <span {...props} dangerouslySetInnerHTML={{__html: svg}}/>;
};

export default Icon;