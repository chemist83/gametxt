let scene, camera, renderer;
let userName = "";

function init3D() {
    userName = document.getElementById('username').value || "Bilinmeyen";
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-ui').classList.remove('hidden');

    // Sahne
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020000);

    // Kamera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 0.1);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // ODA OBJESİ (Kutu içi)
    const geometry = new THREE.BoxGeometry(20, 20, 20);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x111111, 
        side: THREE.BackSide,
        wireframe: true // Başlangıçta odayı görebilmen için çizgisel yaptık
    });
    const room = new THREE.Mesh(geometry, material);
    scene.add(room);

    // Kırmızı bir ışık kaynağı gibi duran küçük bir küre (Karakterin olduğu yer)
    const ghostGeo = new THREE.SphereGeometry(1, 32, 32);
    const ghostMat = new THREE.MeshBasicMaterial({ color: 0x330000 });
    const ghost = new THREE.Mesh(ghostGeo, ghostMat);
    ghost.position.set(0, 0, -8);
    scene.add(ghost);

    animate();
}

// Tablet Bakış Kontrolü
let lon = 0, lat = 0, isUserInteracting = false, onPointerDownPointerX = 0, onPointerDownPointerY = 0, onPointerDownLon = 0, onPointerDownLat = 0;

document.addEventListener('pointerdown', (e) => {
    isUserInteracting = true;
    onPointerDownPointerX = e.clientX;
    onPointerDownPointerY = e.clientY;
    onPointerDownLon = lon;
    onPointerDownLat = lat;
});

document.addEventListener('pointermove', (e) => {
    if (isUserInteracting) {
        lon = (onPointerDownPointerX - e.clientX) * 0.2 + onPointerDownLon;
        lat = (e.clientY - onPointerDownPointerY) * 0.2 + onPointerDownLat;
    }
});

document.addEventListener('pointerup', () => isUserInteracting = false);

function animate() {
    requestAnimationFrame(animate);
    lat = Math.max(-85, Math.min(85, lat));
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(lon);

    const target = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta)
    );
    camera.lookAt(target);
    renderer.render(scene, camera);
}

function nextStep() {
    document.getElementById('jumpscare').classList.remove('hidden');
    document.getElementById('jumpscare').innerHTML = `<h1>ELVEDA ${userName.toUpperCase()}</h1>`;
}

