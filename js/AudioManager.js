// Audio Manager for Wedding Game
class AudioManager {
    constructor() {
        this.bgMusic = null;
        this.isMuted = false;
        this.volume = 0.3;
        
        // You can add your own wedding music URL here
        // For now, we'll use Web Audio API to create simple tones
        this.audioContext = null;
        this.musicGain = null;
        
        this.initAudio();
    }

    initAudio() {
        try {
            // Create audio context
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
            
            // Create gain node for volume control
            this.musicGain = this.audioContext.createGain();
            this.musicGain.gain.value = this.volume;
            this.musicGain.connect(this.audioContext.destination);
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    // Play a simple romantic melody
    playRomanticMelody() {
        if (!this.audioContext || this.isMuted) return;

        // Simple romantic melody notes (in Hz)
        const melody = [
            { freq: 523.25, duration: 0.5 }, // C5
            { freq: 587.33, duration: 0.5 }, // D5
            { freq: 659.25, duration: 0.5 }, // E5
            { freq: 698.46, duration: 0.5 }, // F5
            { freq: 783.99, duration: 1 },   // G5
            { freq: 659.25, duration: 0.5 }, // E5
            { freq: 523.25, duration: 1 },   // C5
        ];

        let currentTime = this.audioContext.currentTime;

        melody.forEach(note => {
            const oscillator = this.audioContext.createOscillator();
            const noteGain = this.audioContext.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(note.freq, currentTime);
            
            // Envelope
            noteGain.gain.setValueAtTime(0, currentTime);
            noteGain.gain.linearRampToValueAtTime(0.3, currentTime + 0.05);
            noteGain.gain.linearRampToValueAtTime(0, currentTime + note.duration);

            oscillator.connect(noteGain);
            noteGain.connect(this.musicGain);

            oscillator.start(currentTime);
            oscillator.stop(currentTime + note.duration);

            currentTime += note.duration;
        });
    }

    // Play heart collect sound
    playHeartSound() {
        if (!this.audioContext || this.isMuted) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, this.audioContext.currentTime + 0.2);

        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.2);
    }

    // Play jump sound
    playJumpSound() {
        if (!this.audioContext || this.isMuted) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    // Play victory sound
    playVictorySound() {
        if (!this.audioContext || this.isMuted) return;

        const notes = [
            { freq: 523.25, time: 0, duration: 0.15 },    // C
            { freq: 659.25, time: 0.15, duration: 0.15 }, // E
            { freq: 783.99, time: 0.3, duration: 0.15 },  // G
            { freq: 1046.5, time: 0.45, duration: 0.4 }   // C (high)
        ];

        const currentTime = this.audioContext.currentTime;

        notes.forEach(note => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(note.freq, currentTime + note.time);

            gainNode.gain.setValueAtTime(0.3, currentTime + note.time);
            gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + note.time + note.duration);

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.start(currentTime + note.time);
            oscillator.stop(currentTime + note.time + note.duration);
        });
    }

    // Toggle mute
    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.musicGain) {
            this.musicGain.gain.value = this.isMuted ? 0 : this.volume;
        }
        return this.isMuted;
    }

    // Set volume (0 to 1)
    setVolume(vol) {
        this.volume = Math.max(0, Math.min(1, vol));
        if (this.musicGain && !this.isMuted) {
            this.musicGain.gain.value = this.volume;
        }
    }

    // Resume audio context (needed for some browsers)
    resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
}

