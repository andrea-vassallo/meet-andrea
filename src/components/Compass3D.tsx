import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Interactive 3D compass mark — "Quiet Cartographer".
 * Brass-ink needle over a matte ledger-paper dial. Tilts toward the pointer,
 * drifts slowly at rest. Browser-only: import lazily behind <ClientOnly>.
 */
export default function Compass3D({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const size = () => Math.max(1, Math.min(mount.clientWidth, mount.clientHeight));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 2.6, 4.6);
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
    group.rotation.x = 0.16;
    scene.add(group);

    // Dial body
    const dial = new THREE.Mesh(
      new THREE.CylinderGeometry(1.5, 1.5, 0.16, 96),
      new THREE.MeshStandardMaterial({ color: PAPER, roughness: 0.85, metalness: 0.05 }),
    );
    group.add(dial);

    // Outer bezel ring
    const bezel = new THREE.Mesh(
      new THREE.TorusGeometry(1.5, 0.075, 20, 120),
      new THREE.MeshStandardMaterial({ color: INK, roughness: 0.45, metalness: 0.35 }),
    );
    bezel.rotation.x = Math.PI / 2;
    group.add(bezel);

    // Inner engraved ring
    const inner = new THREE.Mesh(
      new THREE.TorusGeometry(1.08, 0.014, 12, 96),
      new THREE.MeshStandardMaterial({ color: ACCENT, roughness: 0.6 }),
    );
    inner.rotation.x = Math.PI / 2;
    inner.position.y = 0.082;
    group.add(inner);

    // Tick marks
    const tickGeo = new THREE.BoxGeometry(0.03, 0.02, 0.16);
    const tickMat = new THREE.MeshStandardMaterial({ color: INK, roughness: 0.7 });
    const majorMat = new THREE.MeshStandardMaterial({ color: ACCENT, roughness: 0.5 });
    for (let i = 0; i < 32; i++) {
      const a = (i / 32) * Math.PI * 2;
      const major = i % 8 === 0;
      const t = new THREE.Mesh(tickGeo, major ? majorMat : tickMat);
      const r = 1.3;
      t.position.set(Math.sin(a) * r, 0.085, Math.cos(a) * r);
      t.rotation.y = a;
      t.scale.setScalar(major ? 1.7 : 1);
      group.add(t);
    }

    // Needle — two opposed blades
    const needle = new THREE.Group();
    const bladeGeo = new THREE.ConeGeometry(0.17, 1.18, 4);
    const north = new THREE.Mesh(
      bladeGeo,
      new THREE.MeshStandardMaterial({ color: ACCENT, roughness: 0.3, metalness: 0.55 }),
    );
    north.rotation.x = -Math.PI / 2;
    north.position.set(0, 0.2, -0.59);
    const south = new THREE.Mesh(
      bladeGeo,
      new THREE.MeshStandardMaterial({ color: INK, roughness: 0.4, metalness: 0.4 }),
    );
    south.rotation.x = Math.PI / 2;
    south.position.set(0, 0.2, 0.59);
    needle.add(north, south);

    const cap = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 32, 24),
      new THREE.MeshStandardMaterial({ color: INK, roughness: 0.2, metalness: 0.7 }),
    );
    cap.position.y = 0.22;
    needle.add(cap);
    group.add(needle);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(2.5, 4, 3);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x9fc3b5, 0.6);
    rim.position.set(-3, 1.5, -2);
    scene.add(rim);

    // Pointer parallax
    const target = { x: 0.16, y: 0 };
    const onPointer = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const ny = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      target.y = nx * 1.1;
      target.x = 0.16 + ny * 0.4;
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
      needle.rotation.y = reduced ? -0.4 : -0.4 + Math.sin(t * 0.55) * 0.28;
      group.position.y = reduced ? 0 : Math.sin(t * 0.8) * 0.045;
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
