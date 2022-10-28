import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

export default function Starfield(props) {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 2.5 })
  );
  useFrame((state, delta) => {
    ref.current.rotation.x -= -delta / 50;
    ref.current.rotation.y -= -delta / 50;
    ref.current.rotation.z -= -delta / 70;
  });
  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#ffa0e0"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
