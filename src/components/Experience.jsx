import { Environment, Float, Gltf, TransformControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAtom } from "jotai";
import { useRef } from "react";
import { MathUtils } from "three";
import { Skibidi } from "./Skibidi";
import { skibidiAtom } from "./UI";
export const Experience = () => {
  const kebabs = useRef();
  const [skibidi] = useAtom(skibidiAtom);
  useFrame(({}) => {
    kebabs.current.rotation.y += 0.01;
    kebabs.current.scale.x =
      kebabs.current.scale.y =
      kebabs.current.scale.z =
        MathUtils.lerp(kebabs.current.scale.x, skibidi ? 1 : 100, 0.1);
  });

  return (
    <>
      <Environment preset="sunset" />
      <group ref={kebabs}>
        <Float
          position={[2.5, 1, 1]}
          speed={6}
          floatIntensity={3}
          rotationIntensity={2}
        >
          <Gltf scale={0.2} src="/models/Kebab.glb" castShadow />
        </Float>
        <Float
          position={[-2.5, 1, 1]}
          speed={8}
          floatIntensity={2}
          rotationIntensity={6}
        >
          <Gltf scale={0.2} src="/models/Kebab.glb" castShadow />
        </Float>
        <Float
          position={[0, 1, -2.5]}
          speed={12}
          rotationIntensity={4}
          floatIntensity={3}
        >
          <Gltf scale={0.2} src="/models/Kebab.glb" castShadow />
        </Float>
      </group>
      <TransformControls mode="translate" position-y={1}>
        <Skibidi animation={skibidi ? "Dance" : "Waving"} position-y={-1} />
      </TransformControls>
      <directionalLight position={[0, 2, 5]} intensity={2.5} castShadow />
      <pointLight position={[0, 1, 2]} intensity={20.5} />
      <directionalLight position={[-1, 0, -5]} intensity={5} color={"red"} />
      <directionalLight position={[1, 0, -5]} intensity={12} color={"blue"} />
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#956ec8" />
      </mesh>
    </>
  );
};
