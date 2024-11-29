import { useRef } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import Center from "../components/Center";
import Clump from "../components/Clump";
import Tower from "../components/Tower";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, N8AO, SMAA, Bloom } from "@react-three/postprocessing";

function App() {
  const mouse = useRef([0, 0]);
  return (
    <>
      <Canvas
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 100 }}
      >
        <ambientLight intensity={0.5} />
        <color attach="background" args={["#f4f4f4"]} />
        <spotLight
          intensity={1}
          angle={0.2}
          penumbra={1}
          position={[30, 30, 30]}
          castShadow
          shadow-mapSize={[512, 512]}
        />

        <Tower length={10} />

        <OrbitControls autoRotate />
        <EffectComposer>
          <SMAA />
        </EffectComposer>
      </Canvas>
    </>
  );
}

export default App;
