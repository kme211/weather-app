import React from "react";
import "./styles.css";

const Flipper = ({ showSide, children, ...props }) => {
  const [front, back] = children;

  return (
    <div className={`flip-container side-${showSide}`} {...props}>
      <div className="flipper">
        <div className="front">{front}</div>
        <div className="back">{back}</div>
      </div>
    </div>
  );
};

export default Flipper;