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
   3. Interactive RFC 959 PASV Modal Logic
   ========================================================================== */
const modal = document.getElementById('testbench-modal');
const openBtn = document.getElementById('open-testbench-btn');
const closeBtn = document.getElementById('close-testbench-btn');

if (openBtn && modal) {
    openBtn.addEventListener('click', () => modal.classList.add('active'));
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

// Testbench simulator state
const p1Slider = document.getElementById('p1-slider');
const p2Slider = document.getElementById('p2-slider');
const valP1 = document.getElementById('val-p1');
const valP2 = document.getElementById('val-p2');
const computedPort = document.getElementById('computed-port');
const carrier = document.getElementById('packet-carrier');
const payload = document.getElementById('packet-payload');
const consoleFeed = document.getElementById('testbench-feed');

function updatePortCalc() {
    const p1 = parseInt(p1Slider.value, 10);
    const p2 = parseInt(p2Slider.value, 10);
    valP1.innerText = p1;
    valP2.innerText = p2;
    const port = (p1 * 256) + p2;
    computedPort.innerText = port;
    return port;
}

if (p1Slider && p2Slider) {
    p1Slider.addEventListener('input', updatePortCalc);
    p2Slider.addEventListener('input', updatePortCalc);
}

function writeConsole(msg, type = 'info') {
    if (!consoleFeed) return;
    const line = document.createElement('div');
    line.className = `console-line ${type}`;
    line.innerText = `> ${msg}`;
    consoleFeed.appendChild(line);
    consoleFeed.scrollTop = consoleFeed.scrollHeight;
}

document.getElementById('btn-seq-connect')?.addEventListener('click', () => {
    carrier.style.left = '80%';
    payload.innerText = 'SYN (:21)';
    writeConsole('Client initiates TCP handshake: SYN -> Server:21', 'tx');
    setTimeout(() => {
        carrier.style.left = '0%';
        payload.innerText = '220 READY';
        writeConsole('Server response: 220 Service ready for user.', 'rx');
    }, 700);
});

document.getElementById('btn-seq-pasv')?.addEventListener('click', () => {
    carrier.style.left = '80%';
    payload.innerText = 'PASV';
    writeConsole('Client transmits command: PASV', 'tx');
    const port = updatePortCalc();
    setTimeout(() => {
        carrier.style.left = '0%';
        payload.innerText = `227 (:${port})`;
        writeConsole(`Server replies: 227 Entering Passive Mode (198,51,100,24,${p1Slider.value},${p2Slider.value}) -> Calculated Port: ${port}`, 'rx');
    }, 700);
});

document.getElementById('btn-seq-data')?.addEventListener('click', () => {
    const port = updatePortCalc();
    carrier.style.left = '80%';
    payload.innerText = `STREAM :${port}`;
    writeConsole(`Direct byte-stream data channel established on port ${port}.`, 'info');
});

document.getElementById('btn-seq-reset')?.addEventListener('click', () => {
    carrier.style.left = '0%';
    payload.innerText = 'READY';
    consoleFeed.innerHTML = '<div class="console-line info">> Simulator reset. Ready for sequence.</div>';
});

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
