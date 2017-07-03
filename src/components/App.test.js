import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const mockGetLocation = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        coords: {
          latitude: 33.0244066,
          longitude: -96.9799859
        }
      });
    }, 500);
  });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App getLocation={mockGetLocation} />, div);
});
