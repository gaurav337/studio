'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

const HeroBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;

    // Initialize scene, camera, and renderer only once
    if (!rendererRef.current) {
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
      camera.position.z = 50;
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      currentMount.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      const particlesCount = 5000;
      const positions = new Float32Array(particlesCount * 3);
      for (let i = 0; i < particlesCount; i++) {
          const i3 = i * 3;
          positions[i3] = (Math.random() - 0.5) * 100;
          positions[i3 + 1] = (Math.random() - 0.5) * 100;
          positions[i3 + 2] = (Math.random() - 0.5) * 100;
      }
      const particlesGeometry = new THREE.BufferGeometry();
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.7,
      });
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      particlesRef.current = particles;
      scene.add(particles);

      const mouse = new THREE.Vector2(10000, 10000);
      const handleMouseMove = (event: MouseEvent) => {
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      
      const clock = new THREE.Clock();
      const animate = () => {
        if (!particlesRef.current || !cameraRef.current || !sceneRef.current || !rendererRef.current) return;
        const elapsedTime = clock.getElapsedTime();
        particlesRef.current.rotation.y = elapsedTime * 0.02;
        particlesRef.current.rotation.x = elapsedTime * 0.01;
        cameraRef.current.position.x += (mouse.x * 2 - cameraRef.current.position.x) * 0.02;
        cameraRef.current.position.y += (-mouse.y * 2 - cameraRef.current.position.y) * 0.02;
        cameraRef.current.lookAt(sceneRef.current.position);
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        requestAnimationFrame(animate);
      };
      animate();

      const handleResize = () => {
        if (!cameraRef.current || !rendererRef.current) return;
        cameraRef.current.aspect = currentMount.clientWidth / currentMount.clientHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(currentMount.clientWidth, currentMount.clientHeight);
        rendererRef.current.setPixelRatio(window.devicePixelRatio);
      };
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        if (currentMount && rendererRef.current?.domElement) {
          currentMount.removeChild(rendererRef.current.domElement);
        }
      };
    }
  }, []);

  // Update particle color based on theme
  useEffect(() => {
    if (particlesRef.current && particlesRef.current.material instanceof THREE.PointsMaterial) {
      const particleColor = theme === 'dark' ? 0x64FFDA : 0x000000;
      particlesRef.current.material.color.set(particleColor);
    }
  }, [theme]);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

export default HeroBackground;
