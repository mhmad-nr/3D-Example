import * as THREE from "three"
import { Clouds, Cloud } from "@react-three/drei"
export const Smoke = () => {


    // const smokeOne = {
    //     seed: 1,
    //     segments: 20,
    //     volume: 0,
    //     opacity: 0.1,
    //     fade: 10,
    //     growth: 4,
    //     speed: 1,
    //     x: 0,
    //     y: 4.0,
    //     z: 0,
    //     px: 6.4,
    //     py: 20,
    //     pz: -5,
    //     color: "#000000",
    // }
    const smokeTwo = {
        seed: 1,
        segments: 1,
        volume: 2,
        opacity: 0.08,
        fade: 10,
        growth: 4,
        speed: 1,
        x: 0,
        y: 5,
        z: 0,
        px: 6.4,
        py: 20,
        pz: -5,
        color: "#000000",
    }
  
    return (
        <>
            <group>
                <Clouds material={THREE.MeshLambertMaterial} limit={400}>
                    {/* <Cloud position={[smokeOne.px, smokeOne.py, smokeOne.pz]}  {...smokeOne} color={smokeOne.color} bounds={[smokeOne.x, smokeOne.y, smokeOne.z]} /> */}
                    <Cloud
                        {...smokeTwo}
                        color={smokeTwo.color}
                        position={[smokeTwo.px, smokeTwo.py, smokeTwo.pz]}
                        bounds={[smokeTwo.x, smokeTwo.y, smokeTwo.z]} />
                </Clouds>
            </group>
        </>
    )
}
