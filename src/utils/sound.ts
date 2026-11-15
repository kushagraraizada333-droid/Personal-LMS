import confetti from 'canvas-confetti';

let globalAudioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;

    if (!globalAudioCtx) {
      globalAudioCtx = new AudioContextClass();
    }
    if (globalAudioCtx.state === 'suspended') {
      globalAudioCtx.resume().catch(() => {});
    }
    return globalAudioCtx;
  } catch {
    return null;
  }
};

/**
 * Plays a crisp, satisfying tactile click sound on every mouse interaction.
 * 100% offline, zero latency, synthesized via Web Audio API.
 */
export const playClickSound = () => {
  try {
    const isMuted = localStorage.getItem('hsb_sound_muted') === 'true';
    if (isMuted) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Crisp mechanical tactile tap
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(340, now + 0.024);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.024);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.026);
  } catch {
    // Ignore audio error
  }
};

/**
 * Generates an executive study chime via Web Audio API.
 */
export const playStudyChime = () => {
  try {
    const isMuted = localStorage.getItem('hsb_sound_muted') === 'true';
    if (isMuted) return;

    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 chord

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.12 / (i + 1), now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 1.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 1.5);
    });
  } catch {
    // Ignore audio error
  }
};

/**
 * Soft tick audio for toggles / quick button actions
 */
export const playSoftTick = () => {
  playClickSound();
};

/**
 * Triggers celebratory confetti
 */
export const triggerStudyConfetti = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#004B93', '#38BDF8', '#10B981', '#F59E0B', '#6366F1'],
    });
  } catch {
    // Ignore if confetti fails
  }
};
