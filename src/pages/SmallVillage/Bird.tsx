import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react'
import * as THREE from "three"
import { BirdModel } from './BirdModel';
import { Float } from '@react-three/drei';
import { useStore } from '../../context';

const LINE_NB_POINTS = 1000;

const Bird = () => {

    const prevPoint = useRef<number>(0)
    const birdRef = useRef<THREE.Group>(null);

    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3(
            [
                new THREE.Vector3(3, 8, -5),
                new THREE.Vector3(0, 8, -7),
                new THREE.Vector3(-2, 8, -6.5),
                new THREE.Vector3(-4, 8, -4),
                new THREE.Vector3(-5, 8, 1),
                new THREE.Vector3(0, 8, 3),
                new THREE.Vector3(4, 8, 3),
                new THREE.Vector3(5, 8, -1),
            ],
            true,
            "catmullrom",
            0.8);
    }, []);

    const linePoints = useMemo(() => {
        return curve.getPoints(LINE_NB_POINTS);
    }, [curve]);
    const { store } = useStore()

    useFrame(() => {

        // ---------------------------------------------------
        const curPointIndex = Math.min(
            Math.round(prevPoint.current),
            linePoints.length - 1
        );

        const pointAhead =
            linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];
        birdRef.current?.lookAt(pointAhead)
        birdRef.current?.rotateX(Math.PI / 2)
        birdRef.current?.rotateY(Math.PI)

        // ---------------------------------------------------
        const newPoint = linePoints[prevPoint.current]
        birdRef.current?.position.set(newPoint.x, newPoint.y, newPoint.z);
        prevPoint.current == LINE_NB_POINTS ? prevPoint.current = 0 : prevPoint.current += 1

    })

    return (
        <group visible={!store.isDark} position-y={-2}>
            <group ref={birdRef}>
                <Float floatIntensity={2} speed={2}>
                    <BirdModel scale={[0.25, 0.25, 0.25]} />
                </Float>
            </group>
        </group>
    )
}

export default Bird