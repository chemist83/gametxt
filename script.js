let scene, camera, renderer, sphere;
let userName = "";

function init3D() {
    userName = document.getElementById('username').value || "Bilinmeyen";
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-ui').classList.remove('hidden');

    // Sahne ve Kamera Ayarı
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 3D Odayı Oluşturma (Sphere/Küre Yöntemi)
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Resmi içe doğru çevirir

    const texture = new THREE.TextureLoader().load('oda.jpg');
    const material = new THREE.MeshBasicMaterial({ map: texture });
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.set(0, 0, 0.1);

    animate();
}

// Tablet Dokunmatik Bakış Kontrolü
let isUserInteracting = false, onPointerDownPointerX = 0, onPointerDownPointerY = 0,
    lon = 0, onPointerDownLon = 0, lat = 0, onPointerDownLat = 0;

document.addEventListener('pointerdown', (e) => {
    isUserInteracting = true;
    onPointerDownPointerX = e.clientX;
    onPointerDownPointerY = e.clientY;
    onPointerDownLon = lon;
    onPointerDownLat = lat;
});

document.addEventListener('pointermove', (e) => {
    if (isUserInteracting) {
        lon = (onPointerDownPointerX - e.clientX) * 0.1 + onPointerDownLon;
        lat = (e.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
    }
});

document.addEventListener('pointerup', () => isUserInteracting = false);

function animate() {
    requestAnimationFrame(animate);
    lat = Math.max(-85, Math.min(85, lat));
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(lon);

    camera.target = new THREE.Vector3(
        500 * Math.sin(phi) * Math.cos(theta),
        500 * Math.cos(phi),
        500 * Math.sin(phi) * Math.sin(theta)
    );
    camera.lookAt(camera.target);
    renderer.render(scene, camera);
}

function nextStep() {
    // Soru ilerleme ve final jumpscare kodlarını buraya ekleyebilirsin
    document.getElementById('jumpscare').classList.remove('hidden');
    document.getElementById('jumpscare').innerHTML = `<h1>ELVEDA ${userName}</h1>`;
}
