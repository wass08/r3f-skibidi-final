import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAtom } from "jotai";
import React, { useEffect, useRef } from "react";
import { WiggleBone } from "wiggle/spring";
import { wiggleAtom } from "./UI";

export function Skibidi({ animation, ...props }) {
  const group = useRef();
  const { nodes, scene, animations } = useGLTF(`/models/skibidi.glb`);
  const { actions } = useAnimations(animations, group);

  const [wiggle] = useAtom(wiggleAtom);
  const wiggleBones = useRef([]);

  useEffect(() => {
    scene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    wiggleBones.current.length = 0;

    if (!wiggle) {
      return;
    }

    ["Belly01"].forEach((rootBone) => {
      if (!nodes[rootBone]) {
        return;
      }
      nodes[rootBone].traverse((bone) => {
        if (bone.isBone) {
          const wiggleBone = new WiggleBone(bone, {
            damping: 10,
            stiffness: 300,
          });
          wiggleBones.current.push(wiggleBone);
        }
      });
    });

    return () => {
      wiggleBones.current.forEach((wiggleBone) => {
        wiggleBone.reset();
        wiggleBone.dispose();
      });
    };
  }, [nodes, wiggle]);

  useFrame(() => {
    wiggleBones.current.forEach((wiggleBone) => {
      wiggleBone.update();
    });
  });

  useEffect(() => {
    actions[animation]?.fadeIn(0.5).play();
    return () => actions[animation]?.fadeOut(0.5).stop();
  }, [actions, animation]);
  return (
    <group {...props}>
      <group ref={group} dispose={null}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload(`/models/skibidi.glb`);
