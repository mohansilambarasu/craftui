import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function HeroBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const geometries = [
      new THREE.IcosahedronGeometry(0.8, 0),
      new THREE.OctahedronGeometry(0.6, 0),
      new THREE.TetrahedronGeometry(0.5, 0),
      new THREE.IcosahedronGeometry(0.4, 0),
      new THREE.OctahedronGeometry(0.35, 0),
    ];

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x607456,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });

    const solidMat = new THREE.MeshBasicMaterial({
      color: 0xEEE0CC,
      transparent: true,
      opacity: 0.6,
    });

    const meshes: THREE.Mesh[] = [];
    const positions = [
      [-3.5, 1.5, -1],
      [3.2, -1.2, -2],
      [-2.0, -1.8, -1],
      [2.5, 2.0, -3],
      [-1.0, 2.5, -2],
    ];

    const rotationSpeeds = [
      [0.003, 0.005, 0.002],
      [0.004, 0.002, 0.006],
      [0.002, 0.006, 0.003],
      [0.005, 0.003, 0.004],
      [0.003, 0.004, 0.005],
    ];

    geometries.forEach((geo, i) => {
      const solid = new THREE.Mesh(geo, solidMat.clone());
      const wire = new THREE.Mesh(geo, wireMat.clone());
      const group = new THREE.Group();
      group.add(solid);
      group.add(wire);
      group.position.set(
        positions[i][0],
        positions[i][1],
        positions[i][2]
      );
      scene.add(group);
      meshes.push(solid);
    });

    const floatOffsets = meshes.map(() => Math.random() * Math.PI * 2);
    let frameId: number;
    let t = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.005;

      scene.children.forEach((child, i) => {
        if (child instanceof THREE.Group) {
          child.rotation.x += rotationSpeeds[i][0];
          child.rotation.y += rotationSpeeds[i][1];
          child.rotation.z += rotationSpeeds[i][2];
          child.position.y = positions[i][1] + Math.sin(t + floatOffsets[i]) * 0.15;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
}