import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { WiggleBone } from "wiggle";

export const WiggleBox = () => {
  const { nodes, scene } = useGLTF("/models/Box.glb");
  const wiggleBones = useRef([]);
  useEffect(() => {
    wiggleBones.current.length = 0;
    nodes.RootBone.traverse((bone) => {
      if (bone.isBone && bone !== nodes.RootBone) {
        const wiggleBone = new WiggleBone(bone, {
          velocity: 0.2,
        });
        wiggleBones.current.push(wiggleBone);
      }
    });
    return () => {
      wiggleBones.current.forEach((wiggleBone) => {
        wiggleBone.reset();
        wiggleBone.dispose();
      });
    };
  }, [nodes]);

  useFrame(() => {
    wiggleBones.current.forEach((wiggleBone) => {
      wiggleBone.update();
    });
  });

  return <primitive object={scene} scale={0.2} />;
};
