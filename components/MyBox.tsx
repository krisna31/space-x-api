import { MeshWobbleMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react'

const MyBox = ({ position, scale, args, color, speed }) => {
  const mesh = useRef<any>();
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  });
  return (
    <mesh
      position={position}
      ref={mesh}
      scale={scale}
      castShadow
    >
      <boxGeometry args={args} />
      <MeshWobbleMaterial color={color} speed={speed} factor={0.6} />
    </mesh>
  );
}

export default MyBox