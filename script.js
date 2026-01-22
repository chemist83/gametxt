let userName = "";
let currentStep = 0;

function startGame() {
    userName = document.getElementById('username').value || "Yabancı";
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    document.getElementById('msg-box').innerText = `> Hoş geldin, ${userName}.`;
}

// Mouse hareketi (Derinlik hissi)
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 25;
    const y = (window.innerHeight / 2 - e.pageY) / 25;
    document.getElementById('room-bg').style.transform = `translate(${x}px, ${y}px)`;
});

const story = [
    { q: "Odada yalnız mısın?", a1: "Evet", a2: "Sanırım..." },
    { q: "Peki, arkandaki kim?", a1: "Ne?", a2: "Bakmaya korkuyorum" },
    { q: "Kameranı açmama izin verir misin? Seni görmem lazım.", a1: "Hayır!", a2: "Tamam" },
    { q: "Çok geç artık... Onlar seni seçti.", a1: "KİM?", a2: "YALVARIRIM" }
];

function nextStep(choice) {
    currentStep++;

    if(currentStep === 1) {
        document.getElementById('window-scare').style.opacity = "0.5"; // Figür yavaşça belirir
    }

    if(currentStep === 2) {
        document.getElementById('camera-popup').classList.remove('hidden'); // Sahte kamera uyarısı
    }

    if(currentStep < story.length) {
        document.getElementById('question').innerText = story[currentStep].q;
    } else {
        // FİNAL JUMPSCARE
        setTimeout(() => {
            document.getElementById('final-name').innerText = `MERHAMET YOK, ${userName.toUpperCase()}!`;
            document.getElementById('jumpscare').classList.remove('hidden');
            // Buraya çığlık sesi ekleyebilirsin
        }, 1000);
    }
}

function closeCamera() {
    document.getElementById('camera-popup').classList.add('hidden');
}
