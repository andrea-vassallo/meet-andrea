import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Interactive 3D compass mark — "Quiet Cartographer".
 * A minimal, slender needle on a near-flat paper dial. Tilts gently toward
 * the pointer and drifts at rest. Browser-only: import lazily behind <ClientOnly>.
 */
export default function Compass3D({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const size = () => Math.max(1, Math.min(mount.clientWidth, mount.clientHeight));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0, 3.2, 5.4);
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

    const INK = 0x1a3427;
    const ACCENT = 0x4c7a6d;
    const PAPER = 0xfafaf7;

    const group = new THREE.Group();
    group.scale.setScalar(0.78);
    group.rotation.x = 0.12;
    scene.add(group);

    // Dial body — thin and matte
    const dial = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 0.08, 80),
      new THREE.MeshStandardMaterial({ color: PAPER, roughness: 0.9, metalness: 0 }),
    );
    group.add(dial);

    // Outer hairline ring
    const bezel = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.022, 12, 100),
      new THREE.MeshStandardMaterial({ color: INK, roughness: 0.6, metalness: 0.15 }),
    );
    bezel.rotation.x = Math.PI / 2;
    bezel.position.y = 0.042;
    group.add(bezel);

    // Four cardinal ticks only
    const tickMat = new THREE.MeshStandardMaterial({ color: INK, roughness: 0.7 });
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      const t = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.015, 0.14), tickMat);
      const r = 0.82;
      t.position.set(Math.sin(a) * r, 0.045, Math.cos(a) * r);
      t.rotation.y = a;
      group.add(t);
    }

    // Needle — one slender blade, north-only accent
    const needle = new THREE.Group();
    const bladeGeo = new THREE.ConeGeometry(0.09, 1.05, 4);
    const north = new THREE.Mesh(
      bladeGeo,
      new THREE.MeshStandardMaterial({ color: ACCENT, roughness: 0.35, metalness: 0.35 }),
    );
    north.rotation.x = -Math.PI / 2;
    north.position.set(0, 0.12, -0.52);
    const south = new THREE.Mesh(
      bladeGeo,
      new THREE.MeshStandardMaterial({ color: INK, roughness: 0.45, metalness: 0.25 }),
    );
    south.rotation.x = Math.PI / 2;
    south.position.set(0, 0.12, 0.52);
    needle.add(north, south);

    const cap = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 24, 18),
      new THREE.MeshStandardMaterial({ color: INK, roughness: 0.3, metalness: 0.35 }),
    );
    cap.position.y = 0.16;
    needle.add(cap);
    group.add(needle);

    // Soft lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(2.5, 4, 3);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x9fc3b5, 0.35);
    rim.position.set(-3, 1.5, -2);
    scene.add(rim);

    // Pointer parallax
    const target = { x: 0.12, y: 0 };
    const onPointer = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const ny = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      target.y = nx * 0.9;
      target.x = 0.12 + ny * 0.32;
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
      needle.rotation.y = reduced ? -0.35 : -0.35 + Math.sin(t * 0.5) * 0.22;
      group.position.y = reduced ? 0 : Math.sin(t * 0.7) * 0.035;
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
