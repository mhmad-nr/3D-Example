import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const rainCount = 9500
type propsType = {
    visible: boolean
}
export const Rain = ({ visible }: propsType) => {
    const velocities = useRef<number[]>([])

    const { geometry, material } = useMemo(() => {
        const vertices = [];
        for (let i = 0; i < rainCount; i++) {
            const rainDrop = new THREE.Vector3(
                Math.random() * 30 - 15,
                Math.random() * 15 - 7.5,
                Math.random() * 30 - 15
            );
            velocities.current.push(0);
            vertices.push(rainDrop);

        }
        const geometry = new THREE.BufferGeometry()
        geometry.setFromPoints(vertices)
        const material = new THREE.PointsMaterial({
            color: 0xaaaaaa,
            size: 0.05,
            transparent: true
        })
        return { geometry, material, velocities }

    }, [])
    const ref = useRef<THREE.Points>(null)

    useFrame(() => {
        const positionAttribute = geometry.getAttribute('position');
        for (let i = 0; i < positionAttribute.count; i++) {
            let y = positionAttribute.getY(i);
            let vel = velocities.current[i];
            vel -= 0.1 + Math.random() * 0.1;
            y += vel;
            if (y < -7.5) {
                y = 7.5;
                velocities.current[i] = 0
            }
            positionAttribute.setY(i, y);
        }
        positionAttribute.needsUpdate = true;
    })

    return (
        <points position={[-1, 4, -2]} visible={visible} ref={ref} geometry={geometry} material={material} />
    )
}
