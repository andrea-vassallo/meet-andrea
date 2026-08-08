import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Interactive 3D mark — "Blueprint / Console".
 * A small isometric stack of modules (nodes) that tilts toward the pointer
 * and drifts gently at rest. Browser-only: import lazily behind <ClientOnly>.
 */
export default function Mark3D({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const size = () => Math.max(1, Math.min(mount.clientWidth, mount.clientHeight));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 3.4, 5.6);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(size(), size(), false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    const INK = 0x16181b;
    const ACCENT = 0x2f5fa8;
    const SURFACE = 0xf7f8f8;

    const group = new THREE.Group();
    group.scale.setScalar(0.8);
    group.rotation.x = 0.1;
    scene.add(group);

    const inkMat = new THREE.MeshStandardMaterial({
      color: INK,
      roughness: 0.5,
      metalness: 0.2,
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: ACCENT,
      roughness: 0.35,
      metalness: 0.3,
    });
    const surfaceMat = new THREE.MeshStandardMaterial({
      color: SURFACE,
      roughness: 0.85,
      metalness: 0,
    });

    // Base plate
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.12, 1.7), surfaceMat);
    base.position.y = -0.5;
    group.add(base);

    // Hairline outline of the base
    const baseEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(base.geometry),
      new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.5 }),
    );
    baseEdges.position.copy(base.position);
    group.add(baseEdges);

    // Stacked modules
    const stack = new THREE.Group();
    const mid = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.34, 1.1), inkMat);
    mid.position.y = -0.16;
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.3, 0.72), accentMat);
    top.position.y = 0.24;
    stack.add(mid, top);
    group.add(stack);

    // Connector pin
    const pin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 0.5, 12),
      inkMat,
    );
    pin.position.y = 0.62;
    group.add(pin);
    const node = new THREE.Mesh(new THREE.SphereGeometry(0.09, 20, 16), accentMat);
    node.position.y = 0.9;
    group.add(node);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 1.05);
    key.position.set(2.5, 4, 3);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x9db6dd, 0.4);
    rim.position.set(-3, 1.5, -2);
    scene.add(rim);

    const target = { x: 0.1, y: 0.6 };
    const onPointer = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const ny = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      target.y = 0.6 + nx * 0.9;
      target.x = 0.1 + ny * 0.3;
    };
    if (!reduced) window.addEventListener("pointermove", onPointer);

    const ro = new ResizeObserver(() => {
      const s = size();
      renderer.setSize(s, s, false);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    });
    ro.observe(mount);

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      threshold: 0,
    });
    io.observe(mount);

    const clock = new THREE.Clock();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();
      group.rotation.y += (target.y - group.rotation.y) * 0.05;
      group.rotation.x += (target.x - group.rotation.x) * 0.05;
      if (!reduced) {
        stack.position.y = Math.sin(t * 0.8) * 0.03;
        node.position.y = 0.9 + Math.sin(t * 1.1) * 0.04;
      }
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      renderer.domElement.remove();
      renderer.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
