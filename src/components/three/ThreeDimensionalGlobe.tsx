import { useRef, useEffect } from 'react';
import { NewsArticle } from '@/types';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Card, CardContent, CardTitle } from '@/components/ui';
import { motion } from 'framer-motion';

interface ThreeDimensionalGlobeProps {
  articles: NewsArticle[];
}

const ThreeDimensionalGlobe: React.FC<ThreeDimensionalGlobeProps> = ({ 
  articles 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
    
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 3;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create Earth
    const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
    
    // Add texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      'https://images.pexels.com/photos/2159/flight-sky-earth-space.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    );
    
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpScale: 0.05,
      specular: new THREE.Color(0x333333),
      shininess: 5,
    });
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    
    // Add News Markers
    const articlesWithCoordinates = articles.filter(
      (article) => article.location && article.location.coordinates
    );
    
    articlesWithCoordinates.forEach((article) => {
      if (!article.location) return;
      
      const [longitude, latitude] = article.location.coordinates;
      
      // Convert geographic coordinates to 3D coordinates
      const phi = (90 - latitude) * (Math.PI / 180);
      const theta = (longitude + 180) * (Math.PI / 180);
      
      const x = -1.05 * Math.sin(phi) * Math.cos(theta);
      const y = 1.05 * Math.cos(phi);
      const z = 1.05 * Math.sin(phi) * Math.sin(theta);
      
      // Create marker
      const markerGeometry = new THREE.SphereGeometry(0.02, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({ 
        color: article.isTrending ? 0xff3300 : 0x00aaff 
      });
      
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.set(x, y, z);
      
      // Add glow effect for trending articles
      if (article.isTrending) {
        const glowGeometry = new THREE.SphereGeometry(0.03, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: 0xff3300,
          transparent: true,
          opacity: 0.3,
        });
        
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        marker.add(glow);
      }
      
      earth.add(marker);
    });
    
    // Add subtle atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(1.02, 32, 32);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x0077ff,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
    });
    
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);
    
    // Animation loop
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      
      controls.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [articles]);
  
  return (
    <Card className="h-full overflow-hidden">
      <CardTitle className="p-4 bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
        News Worldwide
      </CardTitle>
      <CardContent className="p-0 h-[calc(100%-56px)]">
        <motion.div 
          ref={containerRef} 
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        ></motion.div>
      </CardContent>
    </Card>
  );
};

export default ThreeDimensionalGlobe;