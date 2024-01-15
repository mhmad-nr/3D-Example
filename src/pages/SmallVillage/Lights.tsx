import { useMemo, useRef } from "react"
import * as THREE from "three"
import { LightMesh } from "../../components"
import { useFrame, GroupProps } from "@react-three/fiber"
import { easing } from 'maath';
import { useStore } from "../../context";
// import { useControls } from "leva";
// import { useHelper } from "@react-three/drei";

export const Lights = (props: GroupProps) => {

    const pointlightRef = useRef<THREE.PointLight>({} as THREE.PointLight)
    const LightMeshRef = useRef<number>(0)
    // const moonRef = useRef<THREE.SpotLight>({} as THREE.SpotLight)

    const spotlightRef = useRef<THREE.SpotLight>({} as THREE.SpotLight)
    const spotlight = useMemo(() => new THREE.SpotLight('#fff'), []);
    const { store } = useStore()

    const ambientLightRef = useRef<THREE.AmbientLight>({} as THREE.AmbientLight)
    useFrame((_state, delta) => {
        easing.damp(pointlightRef.current, "power", store.isDark ? 20 : 0, 0.25, delta);
        easing.damp(LightMeshRef, "current", !store.isDark ? 0.07 : 0, 0.02, delta);
        easing.damp(spotlight, "power", store.isDark ? 40 : 0, 0.1, delta);
        easing.damp(spotlightRef.current, "power", store.isDark ? 60 : 0, 0.25, delta);
        // easing.damp(moonRef.current, "power", store.isDark ? 20 : 0, 0.1, delta);
        easing.damp(ambientLightRef.current, "intensity", store.isDark ? 0.2 : 0.6, 0.1, delta);
    })


    return (
        <>
            <group {...props}>
                <ambientLight ref={ambientLightRef} intensity={0.6} />
                <hemisphereLight color={"0x0000ff"} groundColor="0x00ff00" intensity={0.3} position={[0, 20, 0]} />
                <pointLight
                    power={20}
                    position={[4.03, 0.48, 2.93]} ref={pointlightRef} />
                <LightMesh glowScale={LightMeshRef.current} position={[4.03, 0.47, 2.93]} size={0.065} color="white" emissive="white" glow="white" >
                    <boxGeometry args={[0.02, 0.04, 0.02]} />
                </LightMesh>
                <spotLight
                    ref={spotlightRef}
                    angle={1.1}
                    penumbra={1}
                    decay={2}
                    intensity={0.2}
                    power={60}
                    position={[0.1, 2.55, 0.1]}
                    target-position={[0.1, 0, 0.1]}
                    shadow-mapSize-width={256}
                    shadow-mapSize-height={256}
                    castShadow
                    shadow-bias={-0.1} />
                <LightMesh glowScale={LightMeshRef.current} position={[0.1, 2.59, 0.1]} size={0.065} color="white" emissive="white" glow="white" >
                    <boxGeometry args={[0.02, 0.02, 0.02]} />
                </LightMesh>
                <group>
                    <primitive
                        object={spotlight}
                        position={[1.42, 1.48, -0.81]}
                        angle={1.1}
                        penumbra={1}
                        decay={2}
                        intensity={0.2}
                        power={40}
                        shadow-mapSize-width={512}
                        shadow-mapSize-height={512}
                        castShadow
                        shadow-bias={-0.05}
                    />
                    <primitive object={spotlight.target} position={[1.42, 0, -0.82]} />
                    <LightMesh glowScale={LightMeshRef.current} position={[1.42, 1.48, -0.81]} size={0.065} color="white" emissive="white" glow="white" >
                        <boxGeometry args={[0.02, 0.02, 0.02]} />
                    </LightMesh>
                </group>
                {/* <spotLight
                    ref={moonRef}
                    angle={0.5}
                    penumbra={1}
                    decay={1}
                    intensity={6}
                    power={20}
                    position={[-9, 16, 1]}
                    target-position={[0.1, 0, 0.1]}
                /> */}
            </group>
        </>
    )
}