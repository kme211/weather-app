import colors from "../../colors";
import getRandomNum from "../../services/getRandomNum";

function getRadius({ type, width }) {
  switch (type) {
    case "stars":
      return getRandomNum(0.5, 1);
    case "rain":
      return getRandomNum(0.5, 1);
    case "snow":
      return getRandomNum(1, 3);
    case "sun":
      const maxRadius = 150;
      let radius = width * 0.12;
      return radius > maxRadius ? maxRadius : radius;
    default:
      return 2;
  }
}

function getTotal({ width, height, type }) {
  const divider = {
    rain: 500,
    snow: 1000,
    stars: 500
  };
  return type === "sun" ? 3 : width * height / divider[type];
}

function getX({ width, type }) {
  switch (type) {
    case "rain":
    case "snow":
      return getRandomNum(0, width);
    case "sun":
      return getRandomNum(width * 0.12, width - width * 0.12);
    case "stars":
      return getRandomNum(-width / 2, width + width / 2);
    default:
      return 0;
  }
}

function getY({ height, type }) {
  switch (type) {
    case "rain":
    case "snow":
      return getRandomNum(0, height);
    case "stars":
      return getRandomNum(-height / 2, height + height / 2);
    case "sun":
      return getRandomNum(0, height / 2.5);
    default:
      return 0;
  }
}

function getOpacity({ type }) {
  switch (type) {
    case "rain":
    case "snow":
    case "stars":
      return getRandomNum(0.25, 1);
    case "sun":
      return 1;
    default:
      return 1;
  }
}

const particleGenerators = {
  sun: function({ width, height, type }) {
    let particles = [];
    const total = getTotal({ width, height, type });
    const baseRadius = getRadius({ type, width });
    const x = getX({ width, type });
    const y = getY({ height, type });
    const opacity = getOpacity({ type });

    for (let i = 0; i < total; i++) {
      const particle = {
        index: i,
        x: x,
        y: y,
        radius: baseRadius + i * baseRadius / 4,
        baseRadius: baseRadius,
        endRadius: baseRadius * 2.5,
        opacity: opacity - i * opacity / 4,
        baseOpacity: opacity
      };
      particles.push(particle);
    }
    return particles;
  },
  stars: function({ width, height, type }) {
    let particles = [];
    const total = getTotal({ width, height, type });
    for (let i = 0; i < total; i++) {
      const particle = {
        x: getX({ width, type }),
        y: getY({ height, type }),
        radius: getRadius({ type, width }),
        opacity: getOpacity({ type }),
        degreeX: getRandomNum(0, 360),
        degreeY: getRandomNum(0, 360),
        radian: getRandomNum(0, height > width ? height : width)
      };
      particles.push(particle);
    }
    return particles;
  },
  default: function({ width, height, type }) {
    let particles = [];
    const total = getTotal({ width, height, type });
    for (let i = 0; i < total; i++) {
      const particle = {
        x: getX({ width, type }),
        y: getY({ height, type }),
        radius: getRadius({ type, width }),
        opacity: getOpacity({ type })
      };
      particles.push(particle);
    }
    return particles;
  }
};

export function generateParticles({ type, width, height }) {
  let generator = particleGenerators[type];
  if (!generator) generator = particleGenerators.default;
  return generator({ width, height, type });
}

export const drawParticle = {
  snow: function(ctx, particle, width, height, speed, time) {
    if (particle.y < height) {
      particle.y += particle.radius / 2 * speed;
    } else {
      particle.y = 0;
      particle.x = Math.random() * width;
    }
    ctx.fillStyle = colors.particles.snow[time];
    ctx.globalAlpha = particle.opacity;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  },
  rain: function(ctx, particle, width, height, speed, time) {
    if (particle.y < height) {
      particle.y += particle.radius / 2 * speed;
    } else {
      particle.y = 0;
      particle.x = Math.random() * width;
    }
    ctx.fillStyle = colors.particles.rain[time];
    ctx.globalAlpha = particle.opacity;
    ctx.save();
    ctx.beginPath();
    ctx.scale(1, 15);
    ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
    ctx.restore();
    ctx.fill();
    ctx.closePath();
  },
  stars: function(ctx, particle, width, height, speed, time) {
    particle.degreeX += 0.025 * speed;
    particle.degreeY += 0.025 * speed;
    const xcenter = width / 2;
    const ycenter = height + 5;
    const radian = particle.degreeX / 180 * Math.PI;
    particle.x = xcenter + Math.cos(radian) * particle.radian;
    particle.y = ycenter + Math.sin(radian) * particle.radian;
    ctx.fillStyle = "#ffffff";
    ctx.globalAlpha = particle.opacity;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  },
  sun: function(ctx, particle, width, height, speed, time) {
    if (particle.index > 0) {
      if (particle.radius < particle.endRadius) {
        let radius = 1 - particle.radius / particle.endRadius;
        particle.radius += particle.radius / 500;
        particle.opacity = radius >= 0 ? radius : 0;
      } else {
        particle.radius = particle.baseRadius;
        particle.opacity = 1;
      }
    }

    ctx.fillStyle = colors.particles.sun[time];
    ctx.globalAlpha = particle.opacity;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
};
