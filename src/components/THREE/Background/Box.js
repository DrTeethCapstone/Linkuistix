import React, { useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'

function Box() {
    const myMesh = React.useRef()

    useFrame(({ clock }) => {
        myMesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 3)
        myMesh.current.rotation.y = clock.getElapsedTime() * 1.5
    })
    const texture = useLoader(THREE.TextureLoader, 'https://m.media-amazon.com/images/M/MV5BNmE2ZjQxYmEtMDg0Ni00MTFiLTg1YjAtMDUyMzJhM2VmODY1XkEyXkFqcGdeQXVyMTM1NTIzOTI1._V1_FMjpg_UX1000_.jpg')

    return (
        <mesh scale={[1, 1, 1]} ref={myMesh}>
            <boxGeometry map={texture} args={[3, 4, 1]} />
            {/* <planeGeometry args={[2, 4]} /> */}
            <meshStandardMaterial attach="material" map={texture} />
            {/* <Html distanceFactor={1} position={[0, 0, 0.5]} transform>
                <Form />                    color='red'
            </Html> */}
        </mesh>
    )
}

export default Box