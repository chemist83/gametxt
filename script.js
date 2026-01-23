let scene, camera, renderer, clock, userName;
let lon = 0, lat = 0, isUserInteracting = false;
let onPointerDownPointerX = 0, onPointerDownPointerY = 0, onPointerDownLon = 0, onPointerDownLat = 0;

function init3D() {
    userName = document.getElementById('username').value || "Bilinmeyen";
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-ui').classList.remove('hidden');

    // Sahne Kurulumu
    scene = new THREE.Scene();
    clock = new THREE.Clock();
    camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 1. ODA DUVARLARI
    const roomGeo = new THREE.BoxGeometry(20, 15, 20);
    const roomMat = new THREE.MeshStandardMaterial({ color: 0x111111, side: THREE.BackSide });
    const room = new THREE.Mesh(roomGeo, roomMat);
    scene.add(room);

    // 2. MASA (Derinlik hissi veren ana obje)
    const tableGeo = new THREE.BoxGeometry(10, 0.5, 6);
    const tableMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a });
    const table = new THREE.Mesh(tableGeo, tableMat);
    table.position.set(0, -2.5, -2);
    scene.add(table);

    // 3. IŞIKLANDIRMA
    const pLight = new THREE.PointLight(0xffffff, 0.8, 15);
    pLight.position.set(0, 2, 0); // Tavandan gelen loş ışık
    scene.add(pLight);

    camera.position.set(0, 0, 4);
    
    setupControls();
    animate();
}

function setupControls() {
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
}

function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Start Survey Tarzı Kamera Sallantısı (Nefes Alma)
    camera.position.y = Math.sin(time * 0.5) * 0.05;
    camera.position.x += (Math.sin(time * 0.3) * 0.02 - camera.position.x) * 0.1;

    // Etrafa Bakma Hesaplaması
    lat = Math.max(-30, Math.min(30, lat)); // Bakış açısını kısıtla (Masa başında oturuyorsun)
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(lon);

    const target = new THREE.Vector3();
    target.x = Math.sin(phi) * Math.cos(theta);
    target.y = Math.cos(phi);
    target.z = Math.sin(phi) * Math.sin(theta);
    
    camera.lookAt(target);
    renderer.render(scene, camera);
}

function nextStep() {
    // Final jumpscare
    document.getElementById('jumpscare').classList.remove('hidden');
    document.getElementById('jumpscare').innerHTML = `<h1>GÜLE GÜLE ${userName.toUpperCase()}</h1>`;
}

