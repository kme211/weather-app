import React from "react";
import "./styles.css";
import Flipper from "../Flipper";
import Arrow from "../Arrow";

const Weather = ({
  onClick,
  temp,
  feelsLike,
  desc,
  hourlySummary,
  error,
  flipperSideShown,
  tempScale,
  changeTempScale,
  style
}) => {
  const component = error
    ? <div className="Weather__error">{error}</div>
    : <Flipper showSide={flipperSideShown} style={style}>
        <div className="Weather">
          <div className="Weather__temp">
            {temp}
            <div className="Weather__feels-like">
              (but it feels like {feelsLike})
            </div>
          </div>

          <div className="Weather__desc">{desc} right now.</div>
          
          <div className="flip-btn" onClick={onClick}><Arrow /></div>
        </div>
        <div className="Weather">
          <div className="Weather__desc">{hourlySummary}</div>
          <div className="flip-btn reverse" onClick={onClick}><Arrow /></div>
        </div>
      </Flipper>;
  return component;
};

export default Weather;
