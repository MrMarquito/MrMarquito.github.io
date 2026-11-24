/* ==========================================================================
   1. Subtle Interaction Audio Engine (Optional & Muted by Default)
   ========================================================================== */
class SubtleAudioEngine {
    constructor() {
        this.ctx = null;
        this.enabled = false;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggle() {
        this.init();
        this.enabled = !this.enabled;
        return this.enabled;
    }

    playClick() {
        if (!this.enabled || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.03);

            gain.gain.setValueAtTime(0.025, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.03);
        } catch (e) {}
    }
}

const audio = new SubtleAudioEngine();
const audioBtn = document.getElementById('audio-toggle-btn');
const audioStatus = document.getElementById('audio-status');

if (audioBtn) {
    audioBtn.addEventListener('click', () => {
        const isActive = audio.toggle();
        audioBtn.classList.toggle('active', isActive);
        audioStatus.innerText = isActive ? 'ACTIVE' : 'MUTED';
        if (isActive) audio.playClick();
    });
}

document.querySelectorAll('button, .btn, .filter-chip').forEach(el => {
    el.addEventListener('click', () => audio.playClick());
});

/* ==========================================================================
   2. Subtle Ambient Canvas Particles
   ========================================================================== */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width, height, nodes;

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    nodes = [];
    const count = Math.min(Math.floor(width / 28), 45);

    for (let i = 0; i < count; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            radius: Math.random() * 1.5 + 1
        });
    }
}

function renderCanvas() {
    requestAnimationFrame(renderCanvas);
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
    for (let i = 0; i < nodes.length; i++) {
        let n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
            let n2 = nodes[j];
            let dist = Math.hypot(n.x - n2.x, n.y - n2.y);
            if (dist < 110) {
                ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 * (1 - dist / 110)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(n.x, n.y);
                ctx.lineTo(n2.x, n2.y);
                ctx.stroke();
            }
        }
    }
}

window.addEventListener('resize', initCanvas);
initCanvas();
renderCanvas();

/* ==========================================================================
   3. Guided FTP Download Demo
   ========================================================================== */
const modal = document.getElementById('testbench-modal');
const openBtn = document.getElementById('open-testbench-btn');
if (openBtn && modal) {
    const connect = document.getElementById('ftp-connect');
    const file = document.getElementById('ftp-file');
    const download = document.getElementById('ftp-download');
    const restart = document.getElementById('ftp-restart');
    const status = document.getElementById('ftp-status');
    const details = document.getElementById('ftp-details');
    const initialMessage = status.textContent;

    function resetDemo() {
        connect.disabled = false;
        file.value = '';
        file.disabled = true;
        download.disabled = true;
        restart.hidden = true;
        details.open = false;
        status.textContent = initialMessage;
        modal.scrollTop = 0;
    }

    openBtn.addEventListener('click', () => {
        resetDemo();
        // Some browsers do not focus buttons on pointer activation.
        openBtn.focus({ preventScroll: true });
        modal.showModal();
    });
    document.getElementById('close-testbench-btn').addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
        if (e.target !== modal) return;
        const bounds = modal.getBoundingClientRect();
        if (e.clientX < bounds.left || e.clientX > bounds.right ||
            e.clientY < bounds.top || e.clientY > bounds.bottom) modal.close();
    });

    connect.addEventListener('click', () => {
        file.disabled = false;
        restart.hidden = false;
        status.textContent = 'Connected. The command connection is open. Choose a file to ask the server for it.';
        file.focus();
        connect.disabled = true;
    });
    file.addEventListener('change', () => {
        download.disabled = !file.value;
    });
    download.addEventListener('click', () => {
        status.textContent = `Simulated download complete: ${file.value} came through a separate file connection. That connection closed, while the command connection stayed open.`;
        restart.focus();
        file.disabled = true;
        download.disabled = true;
    });
    restart.addEventListener('click', () => {
        connect.disabled = false;
        connect.focus();
        resetDemo();
    });
}

/* ==========================================================================
   4. Category Filter Switchboard
   ========================================================================== */
const filterChips = document.querySelectorAll('.filter-chip');
const projectCards = document.querySelectorAll('.project-card');

filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.dataset.filter;

        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

/* ==========================================================================
   5. Live UTC Clock
   ========================================================================== */
function updateClock() {
    const clockEl = document.getElementById('clock-display');
    if (clockEl) {
        const utc = new Date().toISOString().substring(11, 19);
        clockEl.innerText = `UTC ${utc}`;
    }
}
setInterval(updateClock, 1000);
updateClock();
