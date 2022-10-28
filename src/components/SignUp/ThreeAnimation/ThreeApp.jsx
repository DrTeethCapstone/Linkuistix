import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei/native';
import {
  EffectComposer,
  Vignette,
  Scanline,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import Three from './Three';

export default function ThreeApp() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 10], zoom: 10 }}>
        {/* <fog attach="fog" args={['white', 0, 26]} /> */}
        <ambientLight intensity={1} />

        <Three />

        {/* helper info for canvas */}
        {/* <axesHelper
        scale={2}
        position={[0, 0, 0]}
        onUpdate={(self) => self.setColors('#ff2080', '#20ff80', '#2080ff')}
      /> */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          minAzimuthAngle={-0.3}
          maxAzimuthAngle={0.3}
          minPolarAngle={1.54}
          maxPolarAngle={1.54}
          min
        />
        <EffectComposer>
          <Scanline
            blendFunction={BlendFunction.OVERLAY} // blend mode
            density={1.25} // scanline density
            opacity={0.15}
          />

          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </>
  );
}
