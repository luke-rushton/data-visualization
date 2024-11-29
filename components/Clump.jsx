import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { Outlines } from "@react-three/drei";

const rfs = THREE.MathUtils.randFloatSpread;
const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const baubleMaterial = new THREE.MeshStandardMaterial({
  color: "blue",
  emissive: "blue",
  roughness: 0,
  toneMapped: false,
});

export default function Clump({
  mat = new THREE.Matrix4(),
  vec = new THREE.Vector3(),
  ...props
}) {
  const [ref, api] = useSphere(() => ({
    args: [1],
    mass: 0.1,
    angularDamping: 0.1,
    linearDamping: 0.65,
    position: [rfs(20), rfs(20), rfs(20)],
  }));
  useFrame((state) => {
    for (let i = 0; i < 114; i++) {
      // Get current whereabouts of the instanced sphere
      ref.current.getMatrixAt(i, mat);
      // Normalize the position and multiply by a negative force.
      // This is enough to drive it towards the center-point.
      api
        .at(i)
        .applyForce(
          vec
            .setFromMatrixPosition(mat)
            .normalize()
            .multiplyScalar(-40)
            .toArray(),
          [0, 0, 0]
        );
    }
  });
  return (
    <>
      <instancedMesh
        ref={ref}
        castShadow
        receiveShadow
        args={[sphereGeometry, baubleMaterial, 114]}
      ></instancedMesh>
    </>
  );
}
