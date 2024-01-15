import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react'
import * as THREE from "three"
import { LightMesh } from '../../components';
import { useStore } from '../../context';
import { easing } from 'maath';

const LINE_NB_POINTS = 1700;

const Ghost = () => {

    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3(
            [
                new THREE.Vector3(0.8, 3.15, -7.5),
                new THREE.Vector3(-1.2, 4.5, -7.5),
                new THREE.Vector3(-3.2, 3.3, -8.5),
                new THREE.Vector3(-3.2, 3.15, -6.5),
                new THREE.Vector3(-3, 3.5, -5.5),
                new THREE.Vector3(-4, 2.5, -4.8),
                new THREE.Vector3(-3, 2.92, -3.5),
                new THREE.Vector3(-4, 5, -2),
                new THREE.Vector3(-6, 2.9, -2),
                new THREE.Vector3(-7, 2.9, -3),
                new THREE.Vector3(-5, 5.29, -4),
                new THREE.Vector3(-4.5, 3.5, -5),
                new THREE.Vector3(-5.2, 3.5, -6),
                new THREE.Vector3(-4.5, 5.5, -7),
                new THREE.Vector3(-3.5, 3.5, -7),
                new THREE.Vector3(-3, 3.5, -5.5),
                new THREE.Vector3(-1.5, 3.5, -5.8),
                new THREE.Vector3(-0.85, 3.5, -7),
            ],
            true,
            "catmullrom",
            0.6);
    }, []);

    const ghostRef = useRef<THREE.Mesh>(null)
    const pointlightRef = useRef<THREE.PointLight>({} as THREE.PointLight)
    const prevPoint = useRef<number>(0)

    const linePoints = useMemo(() => {
        return curve.getPoints(LINE_NB_POINTS);
    }, [curve]);
    const { store } = useStore()


    useFrame((_state, delta) => {

        easing.damp(pointlightRef.current, "power", store.isDark ? 20 : 0, 0.2, delta);

        const newPoint = linePoints[prevPoint.current]
        pointlightRef.current?.position.set(newPoint.x, newPoint.y, newPoint.z);
        ghostRef.current?.position.set(newPoint.x, newPoint.y, newPoint.z);

        prevPoint.current == LINE_NB_POINTS ? prevPoint.current = 0 : prevPoint.current += 1
    })

    return (

        <group visible={store.isDark} position-y={-2}>
            <pointLight shadow-mapSize-width={64}
                shadow-mapSize-height={64}
                castShadow
                shadow-bias={-0.001} power={20}
                position={[4.03, 0.48, 2.93]} ref={pointlightRef}
            />
            <LightMesh glowScale={0.07} ref={ghostRef} size={0.065} color="white" emissive="white" glow="white" position={[1, 1, -1]} >
                <sphereGeometry args={[0.065, 8, 8]} />
            </LightMesh>
        </group>
    )
}

export default Ghost
