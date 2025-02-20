import React from 'react'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesComponent = () => {

  const particlesInit = async (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };
  
  return (
    <Particles
          id="tsparticles"
          init={particlesInit}

          options={{
            fpsLimit: 40,
            particles: {
                number: {
                    value: 200,
                    density: {
                        enable: true,
                    },
                },
                color: {
                    //value: ["#fdcf58", "#757676", "#f27d0c", "#800909", "#f07f13"],
                    value: ["#fd5858", "#757676", "#f20c0c", "#800909", "#f01e13"],
                },
                opacity: {
                    value: { min: 0.1, max: 0.5 },
                },
                size: {
                    value: { min: 1, max: 3 },
                },
                move: {
                    enable: true,
                    speed: 3,
                    random: false,
                },
            },
            interactivity: {
                detectsOn: "window",
                events: {
                    onClick: {
                        enable: false,
                        mode: "push",
                    },
                },
            },
            background: {
                image: "radial-gradient(#4a00000F, #000)",
            }
          }}
        />
  )
}

export default ParticlesComponent 