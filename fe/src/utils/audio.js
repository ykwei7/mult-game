let audioCtx = null;
let isMuted = false;
let bgMusicInterval = null;
let bgGainNode = null;

const BPM = 140;
const BEAT = 60 / BPM;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playNote(freq, startTime, duration, type = "square", volume = 0.08, gainNode = null) {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = gainNode || ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);

  if (!gainNode) {
    gain.connect(ctx.destination);
  }
  osc.connect(gain);

  gain.gain.setValueAtTime(volume, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

// Note frequencies
const notes = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
  G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99,
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61,
  G3: 196.00, A3: 220.00, B3: 246.94,
};

// Upbeat chiptune melody pattern
const melody = [
  notes.E4, notes.G4, notes.A4, notes.G4,
  notes.E4, notes.C5, notes.B4, notes.G4,
  notes.A4, notes.G4, notes.E4, notes.D4,
  notes.E4, notes.G4, notes.A4, notes.C5,
  notes.D5, notes.C5, notes.A4, notes.G4,
  notes.E4, notes.G4, notes.A4, notes.B4,
  notes.C5, notes.B4, notes.A4, notes.G4,
  notes.A4, notes.E4, notes.G4, notes.E4,
];

// Bass line
const bass = [
  notes.C3, null, notes.G3, null,
  notes.A3, null, notes.E3, null,
  notes.F3, null, notes.C3, null,
  notes.G3, null, notes.G3, null,
  notes.C3, null, notes.G3, null,
  notes.A3, null, notes.E3, null,
  notes.F3, null, notes.G3, null,
  notes.C3, null, notes.E3, null,
];

function playLoopIteration() {
  if (isMuted) return;

  const ctx = getCtx();
  const now = ctx.currentTime + 0.05;

  bgGainNode = ctx.createGain();
  bgGainNode.gain.setValueAtTime(0.08, now);
  bgGainNode.connect(ctx.destination);

  for (let i = 0; i < melody.length; i++) {
    const time = now + i * BEAT * 0.5;
    // Melody
    playNote(melody[i], time, BEAT * 0.45, "square", 0.06, bgGainNode);
    // Bass
    if (bass[i]) {
      playNote(bass[i], time, BEAT * 0.4, "triangle", 0.1, bgGainNode);
    }
    // Simple percussion (noise-like click on every other beat)
    if (i % 2 === 0) {
      playNote(80, time, 0.05, "sawtooth", 0.04, bgGainNode);
    }
  }
}

export function startBgMusic() {
  if (isMuted) return;
  stopBgMusic();
  const loopDuration = melody.length * BEAT * 0.5 * 1000;
  playLoopIteration();
  bgMusicInterval = setInterval(playLoopIteration, loopDuration);
}

export function stopBgMusic() {
  if (bgMusicInterval) {
    clearInterval(bgMusicInterval);
    bgMusicInterval = null;
  }
}

export function playCorrectSound() {
  if (isMuted) return;
  const ctx = getCtx();
  const now = ctx.currentTime;
  playNote(523.25, now, 0.1, "square", 0.1);       // C5
  playNote(659.25, now + 0.1, 0.1, "square", 0.1);  // E5
  playNote(783.99, now + 0.2, 0.15, "square", 0.1);  // G5
}

export function playWrongSound() {
  if (isMuted) return;
  const ctx = getCtx();
  const now = ctx.currentTime;
  playNote(200, now, 0.15, "sawtooth", 0.1);
  playNote(150, now + 0.15, 0.25, "sawtooth", 0.1);
}

export function playGameOverSound() {
  if (isMuted) return;
  const ctx = getCtx();
  const now = ctx.currentTime;
  playNote(notes.G4, now, 0.2, "square", 0.1);
  playNote(notes.E4, now + 0.25, 0.2, "square", 0.1);
  playNote(notes.C4, now + 0.5, 0.4, "square", 0.1);
}

export function toggleMute() {
  isMuted = !isMuted;
  if (isMuted) {
    stopBgMusic();
  } else {
    startBgMusic();
  }
  return isMuted;
}

export function getIsMuted() {
  return isMuted;
}
