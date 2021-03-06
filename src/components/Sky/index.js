import React, { Component } from "react";
import "./styles.css";
import { drawParticle, generateParticles } from "./services/particles";

export default class Sky extends Component {
  ctx = null;
  particles = null;

  draw = () => {
    const { type, speed, width, height, time } = this.props;
    const { ctx } = this;

    ctx.clearRect(0, 0, width, height);

    this.particles.forEach(particle => {
      drawParticle[type](ctx, particle, width, height, speed, time);
    });

    this.animate();
  };

  animate = () => {
    window.requestAnimationFrame(this.draw.bind(this));
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.type !== this.props.type) {
      const { type, width, height } = nextProps;
      this.particles = generateParticles({ type, width, height });
    }
  }

  componentDidMount() {
    const { type, width, height } = this.props;
    this.particles = generateParticles({ type, width, height });
    this.animate();
  }

  render() {
    const { speed, width, height, styles } = this.props;
    return (
      <canvas
        className="sky"
        speed={speed}
        width={width}
        height={height}
        style={styles}
        ref={canvas => {
          if (!this.ctx) this.ctx = canvas.getContext("2d");
        }}
      />
    );
  }
}
