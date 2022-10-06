import React, { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Box from './Box'

function CanvasBg() {
    const myCanvas = React.useRef()

    return (
        <div className='canvas-container'>
            <Canvas ref={myCanvas} orthographic dpr={[1, 2]} camera={{ position: [0, 0, 10], zoom: 200 }}>
                {/* <Camera */}
                <ambientLight intensity={0.1} />
                <directionalLight color="red" position={[0, 0, 5]} />
                <Box />
                <OrbitControls />
                {/* <group rotation={[Math.PI / 5, -Math.PI / 5, Math.PI / 2]}>
                        <Bounds fit clip observe margin={1.25}>
                            <Cursor scale={[0.5, 1, 0.5]} />
                            <Box />
                        </Bounds>
                        <gridHelper args={[10, 40, '#101010', '#050505']} position={[-0.25, 0, 0]} rotation={[0, 0, Math.PI / 2]} />
                    </group> */}

            </Canvas>
        </div>
    )
}

export default CanvasBg