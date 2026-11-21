import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * SylvaWoodlandBackground
 * Interactive procedural 3D Woodland scene inspired by ThreeUI "Sylva — Into the living world"
 * Features:
 *  - Procedural moss-covered terrain and root arches
 *  - Luminous floating pollen, spores, and woodland fireflies
 *  - Interactive pointer-responsive camera parallax
 *  - Volumetric canopy light rays and deep forest mist
 */
export default function SylvaWoodlandBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xe2f7ea, 0.032);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 2.0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- Ambient & Directional Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    // Golden canopy sunlight shaft
    const sunLight = new THREE.DirectionalLight(0xfef08a, 2.6);
    sunLight.position.set(5, 12, 4);
    scene.add(sunLight);

    // Emerald-cyan rim light for moss tips
    const rimLight = new THREE.PointLight(0x34d399, 1.8, 18);
    rimLight.position.set(-4, 3, 2);
    scene.add(rimLight);

    // Soft deep forest floor fill
    const floorLight = new THREE.PointLight(0x22c55e, 1.2, 15);
    floorLight.position.set(0, 0.5, 1);
    scene.add(floorLight);

    // --- Procedural Terrain / Moss Bed ---
    const terrainGeo = new THREE.PlaneGeometry(36, 36, 128, 128);
    terrainGeo.rotateX(-Math.PI / 2);

    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      // Natural rolling knolls and hollows
      const y =
        Math.sin(x * 0.28) * 0.45 +
        Math.cos(z * 0.22) * 0.4 +
        Math.sin(x * 0.65 + z * 0.55) * 0.22 +
        Math.sin(x * 1.5) * Math.cos(z * 1.5) * 0.08;
      pos.setY(i, y - 0.6);
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x2d7a46,
      roughness: 0.8,
      metalness: 0.08,
      flatShading: false,
    });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    scene.add(terrain);

    // --- Procedural Ancient Woodland Root & Arch (Swept Curves) ---
    const curvePoints = [
      new THREE.Vector3(-4.5, -0.6, -1.0),
      new THREE.Vector3(-2.8, 0.8, 0.2),
      new THREE.Vector3(-0.5, 1.6, 0.6),
      new THREE.Vector3(1.8, 1.4, 0.3),
      new THREE.Vector3(3.6, 0.5, -0.5),
      new THREE.Vector3(4.8, -0.6, -1.5),
    ];
    const rootCurve = new THREE.CatmullRomCurve3(curvePoints);
    const rootGeo = new THREE.TubeGeometry(rootCurve, 80, 0.32, 16, false);

    const rootMat = new THREE.MeshStandardMaterial({
      color: 0x357849,
      roughness: 0.75,
      metalness: 0.1,
    });
    const rootArch = new THREE.Mesh(rootGeo, rootMat);
    scene.add(rootArch);

    // Secondary recursive offshoot root
    const branchPoints = [
      new THREE.Vector3(-0.5, 2.4, 0.8),
      new THREE.Vector3(0.4, 3.1, -0.2),
      new THREE.Vector3(1.6, 3.4, -1.2),
      new THREE.Vector3(2.5, 2.2, -2.0),
      new THREE.Vector3(3.2, -0.5, -2.8),
    ];
    const branchCurve = new THREE.CatmullRomCurve3(branchPoints);
    const branchGeo = new THREE.TubeGeometry(branchCurve, 60, 0.18, 12, false);
    const branchMesh = new THREE.Mesh(branchGeo, rootMat);
    scene.add(branchMesh);

    // Left grounding root
    const leftRootPoints = [
      new THREE.Vector3(-2.8, 1.2, 0.2),
      new THREE.Vector3(-3.8, 0.6, 1.2),
      new THREE.Vector3(-4.9, -0.6, 1.8),
    ];
    const leftCurve = new THREE.CatmullRomCurve3(leftRootPoints);
    const leftRootGeo = new THREE.TubeGeometry(leftCurve, 40, 0.2, 10, false);
    const leftRootMesh = new THREE.Mesh(leftRootGeo, rootMat);
    scene.add(leftRootMesh);

    // --- Floating Spores, Pollen & Woodland Fireflies ---
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 22;
      particlePositions[i * 3 + 1] = Math.random() * 6 - 0.2;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 16;

      particleSpeeds[i * 3] = (Math.random() - 0.5) * 0.008;
      particleSpeeds[i * 3 + 1] = 0.004 + Math.random() * 0.008;
      particleSpeeds[i * 3 + 2] = (Math.random() - 0.5) * 0.008;

      particleScales[i] = Math.random() * 0.8 + 0.4;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Circular soft glowing particle sprite
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(254, 240, 138, 1)');
    grad.addColorStop(0.35, 'rgba(110, 231, 183, 0.7)');
    grad.addColorStop(0.7, 'rgba(52, 211, 153, 0.2)');
    grad.addColorStop(1, 'rgba(16, 185, 129, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.16,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Interactive Mouse Parallax ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // --- Resize Handler ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation for responsive parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      camera.position.x = mouse.x * 0.9;
      camera.position.y = 2.2 - mouse.y * 0.45;
      camera.lookAt(0, 1.4, 0);

      // Subtle breathing organic sway of the root arch
      rootArch.rotation.y = Math.sin(elapsedTime * 0.25) * 0.03;
      branchMesh.rotation.y = Math.sin(elapsedTime * 0.25) * 0.03;

      // Animate floating spores & pollen upward with sinuous drift
      const positions = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleSpeeds[i * 3 + 1];
        positions[i * 3] += Math.sin(elapsedTime + i) * 0.003;
        positions[i * 3 + 2] += Math.cos(elapsedTime + i * 0.5) * 0.003;

        // Reset particles that drift too high
        if (positions[i * 3 + 1] > 5.5) {
          positions[i * 3 + 1] = -0.2;
          positions[i * 3] = (Math.random() - 0.5) * 22;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 16;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Gentle pulsating rim light for moss glow
      rimLight.intensity = 1.8 + Math.sin(elapsedTime * 0.8) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup on unmount ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      terrainGeo.dispose();
      terrainMat.dispose();
      rootGeo.dispose();
      branchGeo.dispose();
      leftRootGeo.dispose();
      rootMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 15%, #ecfdf5 0%, #f0fdf4 35%, #e2f7ea 70%, #d1f2dc 100%)',
      }}
      aria-hidden="true"
    />
  );
}
