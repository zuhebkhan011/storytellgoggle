// Web Audio API ambient generator for real calming background sounds

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private currentMode: string = 'none';
  private gainNode: GainNode | null = null;
  private timerId: number | null = null;
  private noiseNode: AudioNode | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playAmbience(mode: string, volume: number = 0.25) {
    this.stopAmbience();
    this.currentMode = mode;
    if (mode === 'none') return;

    this.initCtx();
    if (!this.ctx) return;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);

    if (mode === 'rain') {
      this.startRain();
    } else if (mode === 'crickets') {
      this.startCrickets();
    } else if (mode === 'harp') {
      this.startHarp();
    }
  }

  private startRain() {
    if (!this.ctx || !this.gainNode) return;
    // Generate pink noise for soft rain
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.12;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter for muffled soft rain
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(700, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(this.gainNode);
    whiteNoise.start(0);
    this.noiseNode = whiteNoise;
  }

  private startCrickets() {
    if (!this.ctx || !this.gainNode) return;

    // Soft background wind
    this.startRain();

    // Periodic gentle cricket pulses
    const playChirp = () => {
      if (!this.ctx || !this.gainNode || this.currentMode !== 'crickets') return;
      const osc = this.ctx.createOscillator();
      const chirpGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(4200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(4700, this.ctx.currentTime + 0.04);

      chirpGain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      chirpGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.07);

      osc.connect(chirpGain);
      chirpGain.connect(this.gainNode);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);

      const nextDelay = 800 + Math.random() * 1400;
      this.timerId = window.setTimeout(playChirp, nextDelay);
    };

    playChirp();
  }

  private startHarp() {
    if (!this.ctx || !this.gainNode) return;

    // Pentatonic scale frequencies (C major / A minor pentatonic: C, D, E, G, A)
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];

    const playHarpNote = () => {
      if (!this.ctx || !this.gainNode || this.currentMode !== 'harp') return;
      const freq = notes[Math.floor(Math.random() * notes.length)];
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      noteGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.8);

      osc.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start();
      osc.stop(this.ctx.currentTime + 2.0);

      const nextDelay = 1200 + Math.random() * 1800;
      this.timerId = window.setTimeout(playHarpNote, nextDelay);
    };

    playHarpNote();
  }

  public stopAmbience() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.noiseNode) {
      try {
        (this.noiseNode as AudioScheduledSourceNode).stop();
      } catch {
        // ignore
      }
      this.noiseNode = null;
    }
    this.currentMode = 'none';
  }
}

export const ambientSound = new AmbientSoundEngine();
