import * as THREE from 'three';

const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0A0A0C);
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.2, 10);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const gridHelper = new THREE.GridHelper(24, 32, 0xffffff, 0xaaaaaa);
gridHelper.position.y = -2.3;
gridHelper.material.transparent = true;
gridHelper.material.opacity = 0.4;
scene.add(gridHelper);

const starsGeo = new THREE.BufferGeometry();
const starsCount = 800;
const starPos = new Float32Array(starsCount * 3);
for (let i = 0; i < starsCount; i++) {
  starPos[i*3]   = (Math.random() - 0.5) * 160;
  starPos[i*3+1] = (Math.random() - 0.5) * 60;
  starPos[i*3+2] = (Math.random() - 0.5) * 70 - 30;
}
starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
const starsMat = new THREE.PointsMaterial({ color: 0xdddddd, size: 0.08, transparent: true, opacity: 0.5 });
const starsField = new THREE.Points(starsGeo, starsMat);
scene.add(starsField);

function animate() {
  requestAnimationFrame(animate);
  gridHelper.rotation.y += 0.0008;
  starsField.rotation.y += 0.0003;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});