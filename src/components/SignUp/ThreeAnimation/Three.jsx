import { useThree } from '@react-three/fiber';
import { useMemo } from 'react';

//components
import Starfield from './Starfield';
import Starfield2 from './Starfield2';
import Title from './Title';

export default function Three() {
  const viewport = useThree((state) => state.viewport);
  const memoizedViewRatio = useMemo(
    () => viewport.width / viewport.height,
    [viewport]
  );

  return (
    <>
      {/* Linkuistix title */}
      <group
        scale={0.075 * memoizedViewRatio}
        position={[0, 0.55, 0]}
        rotation={[0.15, 0.15, 0.0]}
      >
        <Title />
      </group>

      {/* background stars! */}
      <group position={[0, 0, 5]}>
        <Starfield />
        <Starfield2 />
      </group>

      {/* dark canvas */}
      <color attach="background" args={['#010a0f']} />
    </>
  );
}
