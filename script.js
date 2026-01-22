let scene, camera, renderer, cube;
let userName = "";

function init3D() {
    userName = document.getElementById('username').value || "Yabancı";
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-ui').classList.remove('hidden');

    // 1. Sahne ve Kamera
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050000); // Çok koyu kırmızı/siyah arka plan
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 2. Odayı Oluşturma (Kutularla)
    const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x1a1a1a, side: THREE.BackSide });
    const roomGeometry = new THREE.BoxGeometry(10, 10, 10);
    const room = new THREE.Mesh(roomGeometry, wallMaterial);
    scene.add(room);

    // 3. Odaya tekinsiz bir ışık efekti (Kırmızı bir nokta)
    const light = new THREE.PointLight(0xff0000, 1, 10);
    light.position.set(0, 2, 0);
    scene.add(light);

    // 4. Pencere gibi duran beyaz bir obje (Karakterin görüneceği yer)
    const windowGeo = new THREE.PlaneGeometry(2, 3);
    const windowMat = new THREE.MeshBasicMaterial({ color: 0x333333 });
    const windowMesh = new THREE.Mesh(windowGeo, windowMat);
    windowMesh.position.set(0, 0, -4.9); // Karşı duvara yapıştır
    scene.add(windowMesh);

    camera.position.z = 0.1; // Oda merkezindeyiz
    animate();
}

// Tablet Kontrolleri (Dokunarak Etrafa Bakma)
let lon = 0, lat = 0, isUserInteracting = false;
let onPointerDownPointerX = 0, onPointerDownPointerY = 0, onPointerDownLon = 0, onPointerDownLat = 0;

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

    const target = new THREE.Vector3();
    target.x = Math.sin(phi) * Math.cos(theta);
    target.y = Math.cos(phi);
    target.z = Math.sin(phi) * Math.sin(theta);
    
    camera.lookAt(target);
    renderer.render(scene, camera);
}

function nextStep() {
    // Jumpscare tetikleyici
    document.getElementById('jumpscare').style.display = 'flex';
    document.getElementById('jumpscare').innerHTML = `<h1>${userName.toUpperCase()} BURADAN ÇIKIŞ YOK!</h1>`;
}

