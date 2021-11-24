import { Stars } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import cn from "classnames";
import { motion } from "framer-motion";
import { random, range } from "lodash";
import React, { Suspense, useRef } from "react";
import { Color, TextureLoader } from "three";
import useColorScheme from "../../hooks/use-color-scheme";
import { useEventListener } from "../../hooks/use-event-listener";
import cloudTexture from "../../images/cloud.png";

const fogColor = new Color(0x0d202d);
const clouds = range(0, 100).map(() => ({
  position: [random(-500, 500), random(-500, 500), random(-500, 500)],
  rotation: [0, 0, Math.random() * 2 - Math.PI],
}));

const Lights = () => {
  const colors = [0x3b9bd7, 0xd7773b, 0x4dd73b];
  const colorIndex = useRef(random(0, colors.length - 1));
  const intensityDirection = useRef("up");

  const lightRef = useRef();

  useFrame(() => {
    if (intensityDirection.current === "up") {
      lightRef.current.intensity += 0.0005;

      if (lightRef.current.intensity >= 0.3) {
        intensityDirection.current = "down";
      }
    }

    if (intensityDirection.current === "down") {
      lightRef.current.intensity -= 0.0005;

      if (lightRef.current.intensity <= 0) {
        intensityDirection.current = "up";
        colorIndex.current = (colorIndex.current + 1) % colors.length;
        lightRef.current.color = new Color(colors[colorIndex.current]);
      }
    }
  });

  return (
    <>
      <ambientLight color={0x555555} />
      <directionalLight ref={lightRef} color={colors[colorIndex.current]} intensity={0} position={[0, 0, 1]} />
    </>
  );
};

const Cloud = (props) => {
  const cloudMap = useLoader(TextureLoader, cloudTexture);
  const mesh = useRef();

  const y = useRef(props.position[1]);

  useEventListener("scroll", (e) => {
    const scrollTop = document.documentElement.scrollTop;
    mesh.current.position.y = y.current - scrollTop * 0.01;
  });

  useFrame(() => {
    mesh.current.rotation.z += 0.001;
  });

  return (
    <mesh {...props} ref={mesh}>
      <planeBufferGeometry args={[500, 500]} />
      <meshLambertMaterial map={cloudMap} transparent={true} opacity={0.15} />
    </mesh>
  );
};

const StarField = () => {
  const ref = useRef();
  const r = 0.01;
  const v = 0.004 * r;

  const mouse = useRef([0, 0]);

  useEventListener("mousemove", ({ x, y }) => (mouse.current = [x, y]));

  useFrame((state) => {
    const vx = ((mouse.current[0] - window.innerWidth / 2) / window.innerWidth) * 2;
    const vy = ((mouse.current[1] - window.innerHeight / 2) / window.innerHeight) * 2;

    ref.current.rotation.y += v * vx;
    ref.current.rotation.x += v * vy;

    ref.current.rotation.z -= v;
  });

  return <Stars ref={ref} radius={140} depth={50} count={2000} factor={4} saturation={0} fade />;
};

const Background = ({ className }) => {
  const [colorScheme] = useColorScheme();

  if (colorScheme !== "dark") return null;

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
      }}
    >
      <Canvas
        camera={{
          fov: 60,
          aspect: window.innerWidth / window.innerHeight,
          near: 1,
          far: 1000,
          position: [0, 0, 500],
        }}
      >
        <color attach="background" args={[fogColor]} />
        <fogExp2 color={fogColor} density={0.001} />

        <Lights />

        <Suspense fallback={<></>}>
          {clouds.map((props, n) => (
            <Cloud key={n} {...props} />
          ))}
        </Suspense>

        <StarField />
      </Canvas>
    </motion.div>
  );
};

export default Background;
