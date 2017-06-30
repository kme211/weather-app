import React, { Component } from "react";
import Cloud from "./Cloud";
import getRandomNum from "../services/getRandomNum";

class Clouds extends Component {
  constructor(props) {
    super(props);

    const deviceWidth = window.innerWidth;
    const deviceHeight = window.innerHeight;

    this.state = {
      deviceWidth,
      deviceHeight,
      clouds: this.createClouds(this.props.numClouds, deviceWidth, deviceHeight)
    };

    this.animate = this.animate.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    window.requestAnimationFrame(this.animate);
    window.addEventListener('resize', this.onResize);
  }

  createClouds(numClouds, deviceWidth, deviceHeight) {
    const clouds = (new Array(numClouds)).fill(undefined).map((cloud, index) => {
      return {
        id: `cloud_${index}`,
        style: {
          top: getRandomNum(10, deviceHeight - 50),
          left: getRandomNum(-350, deviceWidth),
          scale: getRandomNum(0.1, 1)
        }
      };
    });
    return clouds;
  }

  onResize() {
    const deviceWidth = window.innerWidth;
    const deviceHeight = window.innerHeight;
    this.setState({
      deviceWidth,
      deviceHeight,
    });
  }

  animate() {
    let { deviceWidth, deviceHeight } = this.state;
    const { windSpeed } = this.props;
    this.setState(
      {
        clouds: this.state.clouds.map(cloud => {
          const { style } = cloud;
          let { left, top, scale } = style;
          const offScreen = left > deviceWidth;
          const increment = (windSpeed / 10)  + (1 - scale);
          left = offScreen ? -375 : left + increment;
          top = offScreen ? getRandomNum(10, deviceHeight - 50) : top;
          scale = offScreen ? getRandomNum(0.1, 1) : scale;
          return Object.assign({}, cloud, {
            style: {
              top,
              left,
              scale,
              transform: `scale(${scale}`
            }
          });
        })
      },
      () => {
        window.requestAnimationFrame(this.animate);
      }
    );
  }

  render() {
    return (
      <div>
        {this.state.clouds.map(cloud => (
          <Cloud key={cloud.id} style={cloud.style} />
        ))}
      </div>
    );
  }
}

export default Clouds;
