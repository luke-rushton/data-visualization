import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";

export default function Center() {
  const viewport = useThree((state) => state.viewport);
  const [ref, api] = useSphere(() => ({
    type: "Kinematic",
    args: [5],
    position: [0, 0, 0],
  }));
  useFrame((state) => api.position.set(0, 0, 0));
  return (
    <mesh scale={0.0} position={[0, 0, 0]}>
      <sphereGeometry />
      <meshBasicMaterial color={[4, 4, 4]} opacity={0} />
    </mesh>
  );
}
