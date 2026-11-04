import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export interface AcaiCena {
  resize: () => void;
  dispose: () => void;
}

/**
 * Monta um copo de açaí 3D realista (Three.js) dentro do canvas informado.
 * O usuário pode arrastar para girar. Retorna handles de resize e dispose.
 *
 * Portado do protótipo HTML/Three.js fornecido, encapsulado para React.
 */
export function criarAcaiCena(
  stage: HTMLElement,
  canvas: HTMLCanvasElement,
): AcaiCena {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

  scene.add(new THREE.HemisphereLight(0xfff1de, 0x7a1b9a, 0.7));
  const key = new THREE.DirectionalLight(0xfff0dc, 2.4);
  key.position.set(4, 9, 7);
  scene.add(key);
  const rim = new THREE.PointLight(0xff5fb0, 55, 0, 2);
  rim.position.set(-6, 4, -5);
  scene.add(rim);
  const fill = new THREE.PointLight(0xfdb75b, 30, 0, 2);
  fill.position.set(6, 2, 5);
  scene.add(fill);

  /* ---------- utilidades ---------- */
  function rng(seed: number) {
    return () => {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const rand = rng(11);
  const R = (a: number, b: number) => a + (b - a) * rand();
  const pick = <T>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];
  const UP = new THREE.Vector3(0, 1, 0);
  const std = (color: number, o: THREE.MeshStandardMaterialParameters = {}) =>
    new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0, ...o });

  /* ---------- copo ---------- */
  const wallR = (y: number) => 1.05 + 0.1699 * (y - 0.08);
  const cupG = new THREE.Group();
  const cupPts = (
    [
      [0, 0],
      [0.98, 0],
      [1.05, 0.08],
      [1.58, 3.2],
      [1.64, 3.24],
      [1.58, 3.27],
    ] as [number, number][]
  ).map(([x, y]) => new THREE.Vector2(x, y));
  const cup = new THREE.Mesh(
    new THREE.LatheGeometry(cupPts, 72),
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.04,
      transparent: true,
      opacity: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      envMapIntensity: 1.6,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  cup.renderOrder = 5;

  const bodyPts: THREE.Vector2[] = [new THREE.Vector2(0, 0.1)];
  for (let y = 0.1; y <= 3.0001; y += 0.1)
    bodyPts.push(new THREE.Vector2(wallR(y) - 0.09, y));
  bodyPts.push(new THREE.Vector2(0, 3.0));
  const body = new THREE.Mesh(
    new THREE.LatheGeometry(bodyPts, 72),
    std(0x3f0d5c, { roughness: 0.38, side: THREE.DoubleSide }),
  );

  /* montinho de açaí no topo */
  const moundGeo = new THREE.SphereGeometry(1, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2);
  {
    const p = moundGeo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i),
        y = p.getY(i),
        z = p.getZ(i);
      const n =
        0.035 * Math.sin(x * 7 + z * 4) +
        0.03 * Math.sin(z * 9 - x * 3) +
        0.02 * Math.sin((x + z) * 13);
      p.setXYZ(i, x * 1.47, y * 0.62 + n * y, z * 1.47);
    }
    moundGeo.computeVertexNormals();
  }
  const mound = new THREE.Mesh(moundGeo, std(0x45125f, { roughness: 0.4, envMapIntensity: 0.6 }));
  mound.position.y = 3.0;
  cupG.add(body, mound, cup);

  const surf = (x: number, z: number) => {
    const r = Math.hypot(x, z) / 1.47;
    return r >= 1 ? 3.0 : 3.0 + 0.62 * Math.sqrt(1 - r * r);
  };

  /* ---------- camadas visíveis pelo copo ---------- */
  function ring(
    y: number,
    count: number,
    make: (i: number) => THREE.Object3D,
    jit = 0.07,
  ) {
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + R(-0.12, 0.12);
      const yy = y + R(-jit, jit);
      const r = wallR(yy) - 0.1;
      const m = make(i);
      m.position.set(Math.cos(a) * r, yy, Math.sin(a) * r);
      m.quaternion.setFromUnitVectors(
        UP,
        new THREE.Vector3(Math.cos(a), -0.17, Math.sin(a)).normalize(),
      );
      m.rotateY(R(0, 6.28));
      cupG.add(m);
    }
  }

  const bananaGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.07, 28);
  const bananaMat = std(0xf0c53f, { roughness: 0.55 });
  const banana = () => new THREE.Mesh(bananaGeo, bananaMat);

  const granolaGeo = new THREE.IcosahedronGeometry(0.1, 0);
  const granolaMats = [
    std(0xc58b4a, { roughness: 0.9, flatShading: true }),
    std(0xa86b32, { roughness: 0.9, flatShading: true }),
  ];
  const granola = () => {
    const m = new THREE.Mesh(granolaGeo, pick(granolaMats));
    m.scale.set(R(1.1, 1.7), R(0.7, 1), R(0.9, 1.4));
    return m;
  };

  const berryDiscGeo = new THREE.SphereGeometry(0.22, 24, 12);
  const coreGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.05, 16);
  const strawMat = std(0xe3293f, { roughness: 0.35 });
  const coreMat = std(0xffd9d0, { roughness: 0.6 });
  const strawDisc = () => {
    const g = new THREE.Group();
    const d = new THREE.Mesh(berryDiscGeo, strawMat);
    d.scale.set(1, 0.3, 1);
    g.add(d);
    const c = new THREE.Mesh(coreGeo, coreMat);
    c.position.y = 0.02;
    g.add(c);
    return g;
  };

  const sprinkleGeo = new THREE.BoxGeometry(0.2, 0.05, 0.05);
  const sprinkleMats = [
    std(0x3b1d0e, { roughness: 0.4 }),
    std(0x4d2812, { roughness: 0.4 }),
  ];
  const sprinkle = () => new THREE.Mesh(sprinkleGeo, pick(sprinkleMats));

  ring(0.5, 15, banana);
  ring(1.1, 26, granola);
  ring(1.72, 15, strawDisc);
  ring(2.3, 30, sprinkle);
  ring(2.8, 15, banana);

  /* ---------- coberturas em cima ---------- */
  function scatter(
    count: number,
    rMin: number,
    rMax: number,
    make: () => THREE.Object3D,
    lift: number,
    rot = true,
  ) {
    for (let i = 0; i < count; i++) {
      const a = R(0, 6.283),
        r = R(rMin, rMax);
      const x = Math.cos(a) * r,
        z = Math.sin(a) * r;
      const m = make();
      m.position.set(x, surf(x, z) + lift, z);
      if (rot) m.rotation.set(R(-0.5, 0.5), R(0, 6.28), R(-0.5, 0.5));
      cupG.add(m);
    }
  }

  const chunkGeo = new THREE.IcosahedronGeometry(0.19, 0);
  const chunkMats = [0xd9223a, 0xe8384f, 0xc41a33].map((c) =>
    std(c, { roughness: 0.3, flatShading: true }),
  );
  scatter(
    11,
    0.3,
    1.1,
    () => {
      const m = new THREE.Mesh(chunkGeo, pick(chunkMats));
      m.scale.set(R(0.9, 1.3), R(0.8, 1.1), R(0.9, 1.2));
      return m;
    },
    0.06,
  );
  scatter(5, 0.5, 1.1, banana, 0.1);

  const dropGeo = new THREE.SphereGeometry(0.075, 14, 10);
  const dropMat = std(0x2e150a, { roughness: 0.25 });
  scatter(
    22,
    0.2,
    1.3,
    () => {
      const m = new THREE.Mesh(dropGeo, dropMat);
      m.scale.y = 0.7;
      return m;
    },
    0.03,
    false,
  );

  const topSprGeo = new THREE.BoxGeometry(0.14, 0.035, 0.035);
  scatter(55, 0.1, 1.35, () => new THREE.Mesh(topSprGeo, pick(sprinkleMats)), 0.02, false);
  cupG.children.slice(-55).forEach((m) => (m.rotation.y = R(0, 6.28)));

  const pacocaMat = std(0xc99a5b, { roughness: 0.9 });
  scatter(
    14,
    0.3,
    1.2,
    () =>
      new THREE.Mesh(
        new THREE.BoxGeometry(R(0.1, 0.2), R(0.07, 0.12), R(0.1, 0.18)),
        pacocaMat,
      ),
    0.05,
  );

  /* bis */
  const bisMat = std(0x5a2d14, { roughness: 0.45 });
  const bisGeo = new THREE.BoxGeometry(0.62, 0.12, 0.2);
  (
    [
      [0.5, 0.4, [0.2, 0.9, -0.6]],
      [-0.25, 0.7, [-0.3, -0.4, 0.55]],
    ] as [number, number, [number, number, number]][]
  ).forEach(([x, z, rot]) => {
    const b = new THREE.Mesh(bisGeo, bisMat);
    b.position.set(x, surf(x, z) + 0.26, z);
    b.rotation.set(rot[0], rot[1], rot[2]);
    cupG.add(b);
  });

  /* leite condensado */
  const milkMat = new THREE.MeshPhysicalMaterial({
    color: 0xfff2d2,
    roughness: 0.15,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  });
  for (let k = 0; k < 6; k++) {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const a = (k * Math.PI) / 3 + 0.35 * Math.sin(t * 7 + k);
      const r = 0.12 + t * 1.15;
      const x = Math.cos(a) * r,
        z = Math.sin(a) * r;
      pts.push(new THREE.Vector3(x, surf(x, z) + 0.035, z));
    }
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 70, 0.034, 8),
      milkMat,
    );
    cupG.add(tube);
    const end = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 10), milkMat);
    end.position.copy(pts[pts.length - 1]);
    cupG.add(end);
  }

  /* cereja */
  {
    const cx = 0.05,
      cz = -0.05,
      cy = surf(cx, cz) + 0.2;
    const cherry = new THREE.Mesh(
      new THREE.SphereGeometry(0.29, 32, 24),
      new THREE.MeshPhysicalMaterial({
        color: 0xb30f1f,
        roughness: 0.15,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
      }),
    );
    cherry.position.set(cx, cy, cz);
    cupG.add(cherry);
    const stemPts = (
      [
        [0, 0.25, 0],
        [0.05, 0.52, 0.03],
        [0.2, 0.7, 0.1],
        [0.34, 0.78, 0.08],
      ] as [number, number, number][]
    ).map((p) => new THREE.Vector3(cx + p[0], cy + p[1], cz + p[2]));
    cupG.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(stemPts), 20, 0.02, 6),
        std(0x6b7a2a, { roughness: 0.6 }),
      ),
    );
  }

  /* colher */
  {
    const spoon = new THREE.Group();
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xfdb75b,
      roughness: 0.3,
      clearcoat: 0.6,
    });
    const handle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.075, 0.1, 1.9, 16),
      mat,
    );
    handle.position.y = 0.95;
    handle.scale.z = 0.4;
    const bowl = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), mat);
    bowl.scale.set(0.24, 0.07, 0.36);
    spoon.add(handle, bowl);
    spoon.position.set(-0.7, 3.4, -0.45);
    spoon.rotation.set(-0.3, 0.4, 0.5);
    cupG.add(spoon);
  }

  cupG.rotation.x = 0.12;
  const world = new THREE.Group();
  world.add(cupG);
  scene.add(world);

  /* sombra de contato */
  {
    const c2 = document.createElement('canvas');
    c2.width = c2.height = 256;
    const g = c2.getContext('2d')!;
    const gr = g.createRadialGradient(128, 128, 10, 128, 128, 128);
    gr.addColorStop(0, 'rgba(50,8,70,.5)');
    gr.addColorStop(0.6, 'rgba(50,8,70,.18)');
    gr.addColorStop(1, 'rgba(50,8,70,0)');
    g.fillStyle = gr;
    g.fillRect(0, 0, 256, 256);
    const sh = new THREE.Mesh(
      new THREE.PlaneGeometry(5.6, 5.6),
      new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(c2),
        transparent: true,
        depthWrite: false,
      }),
    );
    sh.rotation.x = -Math.PI / 2;
    sh.position.y = -0.02;
    scene.add(sh);
  }

  /* açaís flutuando */
  const orb = new THREE.Group();
  scene.add(orb);
  {
    const geo = new THREE.SphereGeometry(1, 32, 24);
    const mats = [0x4b1768, 0x5e2183, 0x7a1b9a].map(
      (c) =>
        new THREE.MeshPhysicalMaterial({
          color: c,
          roughness: 0.3,
          clearcoat: 0.8,
          clearcoatRoughness: 0.2,
        }),
    );
    for (let i = 0; i < 18; i++) {
      const m = new THREE.Mesh(geo, mats[i % 3]);
      const s = R(0.1, 0.2);
      m.scale.setScalar(s);
      m.userData = {
        a: (i / 18) * Math.PI * 2 + R(-0.2, 0.2),
        rad: R(2.6, 3.4),
        y: R(0.5, 4.6),
        sp: R(0.4, 1),
        ph: R(0, 6.28),
      };
      orb.add(m);
    }
  }

  /* ---------- interação ---------- */
  let rotY = 0.6,
    vel = 0,
    dragging = false,
    lastX = 0;

  const onDown = (e: PointerEvent) => {
    dragging = true;
    lastX = e.clientX;
    canvas.setPointerCapture(e.pointerId);
    stage.classList.add('touched');
  };
  const onMove = (e: PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    rotY += dx * 0.012;
    vel = dx * 0.012;
  };
  const onUp = () => {
    dragging = false;
  };
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', onMove);
  (['pointerup', 'pointercancel', 'pointerleave'] as const).forEach((ev) =>
    canvas.addEventListener(ev, onUp),
  );

  /* ---------- tamanho ---------- */
  let orbitScale = 1;
  function fit() {
    const w = stage.clientWidth,
      h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const t = 2 * Math.tan(THREE.MathUtils.degToRad(15));
    const portrait = camera.aspect < 1;
    orbitScale = portrait ? 0.78 : 1;
    const d = Math.max(6.6 / t, (portrait ? 5.9 : 7.4) / (t * camera.aspect));
    camera.position.set(0, 2.4 + d * 0.2, d);
    camera.lookAt(0, 2.3, 0);
  }
  fit();

  /* ---------- animação ---------- */
  const clock = new THREE.Clock();
  function tick() {
    const dt = Math.min(clock.getDelta(), 0.05),
      t = clock.elapsedTime;
    if (!dragging) {
      rotY += vel;
      vel *= 0.94;
      rotY += (reduce ? 0.1 : 0.45) * dt;
    }
    cupG.rotation.y = rotY;
    cupG.position.y = reduce ? 0 : Math.sin(t * 1.3) * 0.05;
    orb.children.forEach((m) => {
      const u = m.userData as {
        a: number;
        rad: number;
        y: number;
        sp: number;
        ph: number;
      };
      const a = u.a + (reduce ? 0 : t * 0.12 * u.sp);
      m.position.set(
        Math.cos(a) * u.rad * orbitScale,
        u.y + (reduce ? 0 : Math.sin(t * u.sp + u.ph) * 0.18),
        Math.sin(a) * u.rad * orbitScale,
      );
    });
    renderer.render(scene, camera);
  }

  const io = new IntersectionObserver(
    ([en]) => renderer.setAnimationLoop(en.isIntersecting ? tick : null),
    { threshold: 0.01 },
  );
  io.observe(stage);
  renderer.setAnimationLoop(tick);

  return {
    resize: fit,
    dispose: () => {
      io.disconnect();
      renderer.setAnimationLoop(null);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      (['pointerup', 'pointercancel', 'pointerleave'] as const).forEach((ev) =>
        canvas.removeEventListener(ev, onUp),
      );
      pmrem.dispose();
      renderer.dispose();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[];
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) mat.dispose();
      });
    },
  };
}
