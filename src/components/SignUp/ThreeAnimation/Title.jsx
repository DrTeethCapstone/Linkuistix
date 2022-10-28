import React, { useCallback } from 'react';
import { Text3D, Center, Float } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
//the 8-bit font
import eightBitFont from '../../../assets/fonts/PressStart2P-Regular.json';

export default function Title({ ...props }) {
  //   const { width, height } = useThree((state) => state.viewport);
  const viewport = useThree((state) => state.viewport);

  return (
    <Center
    // onCentered={({ container, height }) =>
    //   container.scale.setScalar(viewport.height / height)
    // }
    >
      <Float
        speed={2} // Animation speed, defaults to 1
        rotationIntensity={0.4} // XYZ rotation intensity, defaults to 1
        floatIntensity={2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[-0.005, 0.005]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        matrixAutoUpdate={false}
      >
        <Text3D
          font={eightBitFont}
          matrixAutoUpdate={false}
          bevelEnabled
          bevelSize={0.009}
          anchorX={'left'}
          anchorY={'middle'}
          position={[0, 0, 0]}
          height={1.5}
        >
          Linkuistix <meshNormalMaterial attach="material" />
        </Text3D>
      </Float>
    </Center>
  );
}
