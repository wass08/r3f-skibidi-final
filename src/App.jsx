import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";

function App() {
  return (
    <>
      <UI />
      <Loader />
      <Canvas shadows camera={{ position: [-2, 1, 5], fov: 30 }}>
        <color attach="background" args={["#501899"]} />
        <fog attach="fog" args={["#501899", 5, 20]} />
        <group position-y={-1}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </group>
      </Canvas>
    </>
  );
}

export default App;
