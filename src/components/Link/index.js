import React from "react";

const Link = ({ href, external, children, ...props }) => {
  return external
    ? <a {...props} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
    : <a {...props} href={href}>{children}</a>;
};

export default Link;
