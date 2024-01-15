import { Suspense } from "react";
import { ScrollControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Scene } from './Scene'

import * as THREE from "three"
const SmallVillage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Canvas camera={{ position: new THREE.Vector3(5, 5, 5) }} shadows >
        <ScrollControls pages={8} damping={0.5}>
          <Scene />
        </ScrollControls>
      </Canvas >
    </Suspense>
  )
}
export default SmallVillage



const Loading = () => {
  return (
    <div>Loading...</div>
  )
}

