// ===================================================
// 1. DOM CACHING & INITIALIZATION
// ===================================================
const mainWeb = document.getElementById('main-web');
const textFrames = document.querySelectorAll('.text-frame');
const photos = document.querySelectorAll('.photo-bg');

// Pemicu otomatis pas web pertama kali dibuka oleh Halya
// Pemicu otomatis pas web pertama kali dibuka oleh Halya
// ===================================================
// Pemicu otomatis pas web pertama kali dibuka oleh Halya
// ===================================================
document.addEventListener("DOMContentLoaded", () => {
    // KODE BYPASS KEMARIN UDAH DIHAPUS, BALIK KE MODE KETIKAN INTRO ASLI:
    typeIntro('text-step1', 50, () => {
        const btn1 = document.getElementById('btn-step1');
        if (btn1) btn1.classList.add('show-btn');
    });

    // Jalankan fungsi klik foto dump lo
    document.querySelectorAll('.dump-item').forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            let bgImg = window.getComputedStyle(this).backgroundImage;
            let imgUrl = bgImg.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
            let captionText = this.getAttribute('data-caption') || this.innerText || "Our Memory ✨";
            openPhoto(imgUrl, captionText);
        });
    });
});
// ===================================================
// 2. FUNGSI TYPING INTRO & TRANSISI HALAMAN
// ===================================================
function typeIntro(elementId, speed, onComplete) {
    const element = document.getElementById(elementId);
    if (!element) return;
   
    const text = element.getAttribute('data-text');
    let i = 0;
    element.innerHTML = "";
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else {
            if (typeof onComplete === 'function') onComplete();
        }
    }
    typing();
}

function triggerNextStep(currentStep) {
    const currentEl = document.getElementById(`step${currentStep}`);
    if (currentEl) {
        currentEl.classList.add('hidden');
        setTimeout(() => { currentEl.style.display = 'none'; }, 500);
    }
   
    const nextStepNum = currentStep + 1;
    const nextStepEl = document.getElementById(`step${nextStepNum}`);
    if (!nextStepEl) return;
   
    nextStepEl.classList.remove('hidden');
    if (nextStepNum === 2) {
        typeIntro('text-step2', 50, () => {
            const btnGroup2 = document.getElementById('btn-group-step2');
            if (btnGroup2) btnGroup2.classList.add('show-btn');
        });
    } else if (nextStepNum === 3) {
        typeIntro('text-step3', 50, () => {
            startCinematicSequence();
        });
    }
}

// ===================================================
// FIX TRANSISI: SELESAI TEKS 3 -> LANGSUNG HUJAN KERTAS + BALON TERBANG 🎉🎈
// ===================================================
function startCinematicSequence() {
    const music = document.getElementById('bg-music');
    
    if (music) {
        music.volume = 0; // 1. Mulai dari suara sunyi total (0%)
        music.play().then(() => {
            // 2. FUNGSI FADE-IN OTOMATIS
            const targetVolume = 0.25; // 👈 ATUR VOLUME DI SINI (0.25 = 25% suara, pas buat backsound)
            const fadeSpeed = 800;     // Kecepatan transisi (semakin kecil angkanya, makin cepet fade-in nya)
            
            let fadeInInterval = setInterval(() => {
                if (music.volume < targetVolume) {
                    music.volume = Math.min(music.volume + 0.01, targetVolume); // Naik tiap 1% pelan-pelan
                } else {
                    clearInterval(fadeInInterval); // Stop kalau udah nyampe target volume
                }
            }, fadeSpeed);
        }).catch(error => console.log("Autoplay ditahan browser"));
    }

    setTimeout(() => {
        // Sembunyikan tulisan step 3
        document.getElementById('text-step3').classList.add('hidden');
       
        // Transisi masuk ke web utama
        setTimeout(() => {
            const step3El = document.getElementById('step3');
            if (step3El) {
                step3El.classList.add('hidden');
                step3El.style.display = 'none';
            }
            if (mainWeb) {
                mainWeb.classList.remove('hidden-content');
            }
           
            // Kemeriahan balon dan kertas 🎉🎈
            createConfetti();  
            createBalloons();  
            
        }, 600); 
    }, 1000); 
}
// ===================================================
// 3. SISTEM DETEKSI SCROLL UTAMA & TYPING CONTENT
// ===================================================
function typeEffect(element, speed) {
    if (element.classList.contains('is-typing')) return;
   
    const text = element.getAttribute('data-text');
    let i = 0;
    element.classList.add('is-typing');
    element.innerHTML = "";
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

window.addEventListener('scroll', () => {
    if (!mainWeb || mainWeb.classList.contains('hidden-content')) return;
    const viewHeight = window.innerHeight;
    textFrames.forEach((frame) => {
        const rect = frame.getBoundingClientRect();
        const textBox = frame.querySelector('.story-text-box');
        const txtElement = frame.querySelector('.typewriter-text');
        const targetPhotoId = frame.getAttribute('data-photo');
        if (rect.top < viewHeight * 0.55 && rect.bottom > viewHeight * 0.45) {
            if (textBox) textBox.classList.add('active');
            if (txtElement) typeEffect(txtElement, 45);
           
            photos.forEach(photo => {
                photo.classList.toggle('active', photo.id === targetPhotoId);
            });
        } else {
            if (textBox) textBox.classList.remove('active');
        }
    });
});

// ===================================================
// 4. EFEK INTERAKTIF TIUP LILIN, CONFETTI, & BALON
// ===================================================
function tiupLilin() {
    const flame = document.getElementById('lilin-api');
    const status = document.getElementById('cake-status');
   
    if (flame && flame.style.display !== 'none') {
        flame.style.display = 'none';
       
        if (status) {
            status.innerHTML = "Nicee, Congrats Halya!🥳 scroll lagi kuy 👇";
            status.classList.add('pop-surprise');
        }
       
        createConfetti();  
        createBalloons();  
    }
}

function createConfetti() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('confetti-wrapper');
    document.body.appendChild(wrapper);
    const colors = ['#FF6B8B', '#FFB84D', '#4D94FF', '#FF85A2', '#6BE0A3', '#FFD166'];
    for (let i = 0; i < 80; i++) {
        const piece = document.createElement('div');
        piece.classList.add('confetti-piece');
       
        piece.style.setProperty('--x-pos', Math.random() * 100 + 'vw');
        piece.style.setProperty('--x-drift', (Math.random() * 40 - 20) + 'vw');
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 2 + 's';
        piece.style.left = Math.random() * 100 + '%';
       
        piece.style.width = Math.random() * 8 + 6 + 'px';
        piece.style.height = Math.random() * 15 + 10 + 'px';
        wrapper.appendChild(piece);
    }
    setTimeout(() => wrapper.remove(), 5000);
}

function createBalloons() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('balloon-wrapper');
    document.body.appendChild(wrapper);
    const balloonColors = ['#FF6B8B', '#FFF0F2', '#FFD166', '#FF85A2', '#D6BBFB', '#A7F3D0'];
    for (let i = 0; i < 18; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
       
        balloon.style.setProperty('--b-left', Math.random() * 90 + '%');
        balloon.style.setProperty('--b-drift', (Math.random() * 30 - 15) + 'vw');
        balloon.style.setProperty('--b-shake', (Math.random() * 40 - 20) + 'px');
        balloon.style.backgroundColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        balloon.style.animationDelay = Math.random() * 2.5 + 's';
        balloon.style.animationDuration = Math.random() * 2 + 4 + 's';
       
        balloon.style.transform = `scale(${Math.random() * 0.4 + 0.8})`;
        wrapper.appendChild(balloon);
    }
    setTimeout(() => wrapper.remove(), 5000);
}

// ===================================================
// FUNGSI MODAL POP-UP (YANG SUDAH GW FIX ANIMASINYA ✨)
// ===================================================
function openPhoto(url, caption) {
    const photoModal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
   
    if (photoModal && modalImg && modalCaption) {
        modalImg.src = url;
        modalCaption.innerText = caption;
       
        // Langsung tambahkan kelas active, CSS yang bakal urus animasinya secara smooth!
        photoModal.classList.add('active');
    }
}

function closePhoto() {
    const photoModal = document.getElementById('photo-modal');
    if (photoModal) {
        photoModal.classList.remove('active');
    }
}

// ===================================================
// FITUR PENYELAMAT: LAGU MATI OTOMATIS PAS HALYA KELUAR WEB/PINDAH APLIKASI 🎵🤫
// ===================================================
document.addEventListener("visibilitychange", () => {
    const music = document.getElementById('bg-music');
    if (music) {
        if (document.hidden) {
            music.pause(); // Langsung senyap kalau dia pencet Home / pindah ke WA
        } else {
            music.play().catch(error => console.log("Autoplay ditahan")); // Muter lagi pas dia balik ke web
        }
    }
});