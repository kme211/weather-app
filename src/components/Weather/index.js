import React from "react";
import "./styles.css";

const Weather = ({
  handleClick,
  temp,
  feelsLike,
  desc,
  hourlySummary,
  error,
  style
}) => (
  <div className="Weather" style={style}>
    {error
      ? <div className="Weather__error">{error}</div>
      : <div className="Weather__info">
          <div className="Weather__temp" onClick={handleClick}>
            {temp}
            <div className="Weather__feels-like">
              (but it feels like {feelsLike})
            </div>
          </div>

          <div className="Weather__desc">{desc} right now.</div>
          <div className="Weather__desc">{hourlySummary}</div>
        </div>}
  </div>
);

export default Weather;
