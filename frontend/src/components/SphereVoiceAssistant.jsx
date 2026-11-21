import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Sparkles, RefreshCw, AudioWaveform } from 'lucide-react';

export default function SphereVoiceAssistant({ onQuerySubmit, lastAnswer, isProcessing }) {
  const [voiceState, setVoiceState] = useState('idle'); // 'idle' | 'listening' | 'thinking' | 'speaking'
  const [transcript, setTranscript] = useState('');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [activeSpeechText, setActiveSpeechText] = useState('');
  
  const canvasRef = useRef(null);
  const recognitionRef = useRef(null);
  const animFrameRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);

  // Sync state when parent changes processing status
  useEffect(() => {
    if (isProcessing) {
      setVoiceState('thinking');
    }
  }, [isProcessing]);

  // When parent provides a new answer, speak it
  useEffect(() => {
    if (lastAnswer && audioEnabled) {
      speakResponse(lastAnswer);
    }
  }, [lastAnswer]);

  // Setup Web Speech API (SpeechRecognition)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN'; // Also supports hi-IN

      recognition.onstart = () => {
        setVoiceState('listening');
        setTranscript('');
      };

      recognition.onresult = (event) => {
        let currentText = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentText += event.results[i][0].transcript;
        }
        setTranscript(currentText);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setVoiceState('idle');
      };

      recognition.onend = () => {
        if (transcript.trim()) {
          setVoiceState('thinking');
          onQuerySubmit(transcript.trim());
        } else {
          setVoiceState('idle');
        }
      };

      recognitionRef.current = recognition;
    }
  }, [transcript, onQuerySubmit]);

  // Text-to-Speech function
  const speakResponse = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Strip disclaimers for voice brevity
    const cleanText = text.split('Notice:')[0].replace(/\*/g, '').trim();
    setActiveSpeechText(cleanText);

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setVoiceState('speaking');
    };

    utterance.onend = () => {
      setVoiceState('idle');
      setActiveSpeechText('');
    };

    utterance.onerror = () => {
      setVoiceState('idle');
    };

    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (voiceState === 'listening') {
      recognitionRef.current?.stop();
      setVoiceState('idle');
    } else if (voiceState === 'speaking') {
      window.speechSynthesis.cancel();
      setVoiceState('idle');
    } else {
      try {
        recognitionRef.current?.start();
      } catch (e) {
        // Fallback demo question if mic permissions blocked in browser
        setVoiceState('listening');
        setTranscript('Listening to your query...');
        setTimeout(() => {
          const sample = "What is the best sowing time and variety for Sali Paddy in Assam?";
          setTranscript(sample);
          setTimeout(() => {
            setVoiceState('thinking');
            onQuerySubmit(sample);
          }, 800);
        }, 1500);
      }
    }
  };

  // 3D Organic Sphere Animation Engine (WebGL / Procedural Ray-Marched Rendering)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth * 2);
    let height = (canvas.height = canvas.offsetHeight * 2);
    ctx.scale(1, 1);

    let time = 0;
    const particles = Array.from({ length: 48 }, () => ({
      x: (Math.random() - 0.5) * width * 0.7,
      y: (Math.random() - 0.5) * height * 0.7,
      radius: Math.random() * 2 + 1,
      speed: Math.random() * 0.02 + 0.005,
      angle: Math.random() * Math.PI * 2,
      dist: Math.random() * 80 + 100,
    }));

    const render = () => {
      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const baseRadius = Math.min(width, height) * 0.28;

      // Reactivity parameters based on voice state
      let pulseSpeed = 1.0;
      let amplitude = 0.08;
      let auraColor1 = 'rgba(22, 101, 52, 0.45)';
      let auraColor2 = 'rgba(101, 163, 13, 0.35)';
      let coreColor = 'rgba(20, 83, 45, 0.95)';
      let rimGlow = 'rgba(132, 204, 22, 0.85)';
      let particleGlow = 'rgba(163, 230, 53, 0.8)';

      if (voiceState === 'listening') {
        pulseSpeed = 3.2;
        amplitude = 0.18 + Math.sin(time * 6) * 0.06;
        auraColor1 = 'rgba(14, 165, 233, 0.4)';
        auraColor2 = 'rgba(34, 197, 94, 0.5)';
        rimGlow = 'rgba(56, 189, 248, 0.95)';
      } else if (voiceState === 'thinking') {
        pulseSpeed = 4.5;
        amplitude = 0.14 + Math.sin(time * 8) * 0.04;
        auraColor1 = 'rgba(245, 158, 11, 0.45)';
        auraColor2 = 'rgba(16, 185, 129, 0.5)';
        rimGlow = 'rgba(251, 191, 36, 0.95)';
      } else if (voiceState === 'speaking') {
        pulseSpeed = 2.8;
        amplitude = 0.16 + Math.abs(Math.sin(time * 4)) * 0.1;
        auraColor1 = 'rgba(34, 197, 94, 0.5)';
        auraColor2 = 'rgba(132, 204, 22, 0.6)';
        rimGlow = 'rgba(217, 249, 157, 0.95)';
      }

      // 1. Atmospheric Ambient Outer Halo
      const outerGlow = ctx.createRadialGradient(cx, cy, baseRadius * 0.5, cx, cy, baseRadius * 2.1);
      outerGlow.addColorStop(0, auraColor1);
      outerGlow.addColorStop(0.5, auraColor2);
      outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 2.1, 0, Math.PI * 2);
      ctx.fill();

      // 2. Sound Wave / Harmonic Orbital Rings (AmazingUI signature)
      const ringCount = voiceState === 'listening' || voiceState === 'speaking' ? 4 : 2;
      for (let r = 0; r < ringCount; r++) {
        ctx.save();
        ctx.translate(cx, cy);
        const ringRot = time * (0.3 + r * 0.15) * (r % 2 === 0 ? 1 : -1);
        ctx.rotate(ringRot);
        
        ctx.beginPath();
        const rRadiusX = baseRadius * (1.2 + r * 0.28 + Math.sin(time * pulseSpeed + r) * 0.05);
        const rRadiusY = baseRadius * (0.45 + r * 0.12 + Math.cos(time * pulseSpeed + r) * 0.04);
        ctx.ellipse(0, 0, rRadiusX, rRadiusY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = r === 0 ? rimGlow : 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.restore();
      }

      // 3. Floating Energy Ambient Particles
      particles.forEach((p) => {
        p.angle += p.speed * pulseSpeed;
        const px = cx + Math.cos(p.angle) * p.dist * (1 + Math.sin(time + p.angle) * 0.12);
        const py = cy + Math.sin(p.angle) * (p.dist * 0.6) * (1 + Math.cos(time + p.angle) * 0.12);
        
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleGlow;
        ctx.shadowColor = rimGlow;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 4. Main 3D Deforming Organic Sphere
      const points = 72;
      ctx.beginPath();
      for (let i = 0; i <= points; i++) {
        const theta = (i / points) * Math.PI * 2;
        // Harmonic noise distortion
        const wave1 = Math.sin(theta * 4 + time * pulseSpeed) * amplitude;
        const wave2 = Math.cos(theta * 6 - time * (pulseSpeed * 0.8)) * (amplitude * 0.5);
        const wave3 = Math.sin(theta * 2 + time * 1.5) * (amplitude * 0.3);
        const r = baseRadius * (1 + wave1 + wave2 + wave3);

        const x = cx + Math.cos(theta) * r;
        const y = cy + Math.sin(theta) * r;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      // Sphere Shading & Iridescent 3D Gradient
      const sphereGrad = ctx.createRadialGradient(
        cx - baseRadius * 0.35,
        cy - baseRadius * 0.35,
        baseRadius * 0.1,
        cx,
        cy,
        baseRadius * 1.05
      );
      if (voiceState === 'listening') {
        sphereGrad.addColorStop(0, '#e0f2fe');
        sphereGrad.addColorStop(0.3, '#38bdf8');
        sphereGrad.addColorStop(0.7, '#0284c7');
        sphereGrad.addColorStop(1, '#0369a1');
      } else if (voiceState === 'thinking') {
        sphereGrad.addColorStop(0, '#fef3c7');
        sphereGrad.addColorStop(0.3, '#fbbf24');
        sphereGrad.addColorStop(0.7, '#10b981');
        sphereGrad.addColorStop(1, '#065f46');
      } else if (voiceState === 'speaking') {
        sphereGrad.addColorStop(0, '#f7fee7');
        sphereGrad.addColorStop(0.3, '#bef264');
        sphereGrad.addColorStop(0.65, '#22c55e');
        sphereGrad.addColorStop(1, '#14532d');
      } else {
        sphereGrad.addColorStop(0, '#f0fdf4');
        sphereGrad.addColorStop(0.35, '#84cc16');
        sphereGrad.addColorStop(0.75, '#16a34a');
        sphereGrad.addColorStop(1, '#14532d');
      }

      ctx.fillStyle = sphereGrad;
      ctx.shadowColor = rimGlow;
      ctx.shadowBlur = 24;
      ctx.fill();
      ctx.shadowBlur = 0;

      // 5. Specular Holographic Glare Overlay
      const glareGrad = ctx.createLinearGradient(
        cx - baseRadius * 0.6,
        cy - baseRadius * 0.6,
        cx + baseRadius * 0.6,
        cy + baseRadius * 0.6
      );
      glareGrad.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
      glareGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.1)');
      glareGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glareGrad;
      ctx.fill();

      // 6. Surface Caustic Wave Overlay
      ctx.save();
      ctx.clip();
      ctx.beginPath();
      for (let j = -2; j <= 2; j++) {
        const lineY = cy + j * 24 + Math.sin(time * 2 + j) * 8;
        ctx.moveTo(cx - baseRadius, lineY);
        ctx.bezierCurveTo(
          cx - baseRadius * 0.4,
          lineY - 14 * Math.sin(time * 3 + j),
          cx + baseRadius * 0.4,
          lineY + 14 * Math.sin(time * 3 + j),
          cx + baseRadius,
          lineY
        );
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.lineWidth = 2.2;
      ctx.stroke();
      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [voiceState]);

  const stateLabels = {
    idle: { title: 'Sphere AI Ready', desc: 'Tap the sphere or mic to ask your farming query by voice' },
    listening: { title: 'Listening to You...', desc: 'Speak naturally in English, Hindi, or Assamese' },
    thinking: { title: 'Analyzing Agronomy Data...', desc: 'Consulting ICAR bulletins & regional soil models' },
    speaking: { title: 'Krishi AI Speaking', desc: 'Playing verified agricultural guidance' },
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-forest-950 via-forest-900 to-forest-950 rounded-3xl p-6 sm:p-8 text-white border border-forest-800 shadow-2xl transition-all">
      {/* Background ambient radial aura */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-leaf-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Top Header Badge & Audio Toggle */}
      <div className="relative z-10 flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              voiceState === 'listening' ? 'bg-sky-400' : voiceState === 'thinking' ? 'bg-amber-400' : 'bg-leaf-400'
            }`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              voiceState === 'listening' ? 'bg-sky-500' : voiceState === 'thinking' ? 'bg-amber-500' : 'bg-leaf-500'
            }`} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-leaf-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sphere AI Voice Interaction</span>
          </span>
        </div>

        <button
          onClick={() => setAudioEnabled(!audioEnabled)}
          className="p-2 rounded-xl bg-forest-800/80 hover:bg-forest-700 text-gray-300 hover:text-white transition-colors border border-forest-700/60"
          title={audioEnabled ? 'Mute AI voice output' : 'Enable AI voice output'}
        >
          {audioEnabled ? <Volume2 className="w-4 h-4 text-leaf-400" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
        </button>
      </div>

      {/* Center 3D Interactive Canvas */}
      <div className="relative flex flex-col items-center justify-center my-2 cursor-pointer" onClick={toggleListening}>
        <canvas
          ref={canvasRef}
          className="w-full max-w-[320px] h-[220px] sm:h-[260px] touch-none select-none transition-transform hover:scale-105 active:scale-95 duration-300"
        />

        {/* Floating status badge */}
        <div className="absolute bottom-2 px-3.5 py-1 rounded-full bg-forest-950/80 backdrop-blur-md border border-forest-700/80 text-center shadow-lg">
          <span className="text-xs font-semibold text-gray-200">
            {stateLabels[voiceState].title}
          </span>
        </div>
      </div>

      {/* Real-time Voice Audio Visualizer Wave */}
      <div className="relative z-10 text-center space-y-3 mt-4">
        <p className="text-xs text-gray-400 max-w-md mx-auto">
          {transcript ? `"${transcript}"` : stateLabels[voiceState].desc}
        </p>

        {/* Voice Equalizer Frequency Bars */}
        <div className="flex items-center justify-center gap-1.5 h-6">
          {[40, 75, 95, 60, 85, 100, 70, 90, 50, 80, 100, 65, 45].map((height, i) => (
            <span
              key={i}
              className={`w-1 rounded-full transition-all duration-150 ${
                voiceState === 'listening'
                  ? 'bg-sky-400 animate-pulse'
                  : voiceState === 'speaking'
                  ? 'bg-leaf-400 animate-pulse'
                  : voiceState === 'thinking'
                  ? 'bg-amber-400 animate-pulse'
                  : 'bg-forest-700'
              }`}
              style={{
                height: voiceState === 'idle' ? '4px' : `${Math.max(4, (height * (voiceState === 'listening' ? 0.35 : 0.25)))}px`,
                animationDelay: `${i * 0.08}s`
              }}
            />
          ))}
        </div>

        {/* Primary Interactive Voice Action Button */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={toggleListening}
            className={`px-6 py-3 rounded-2xl font-bold text-xs flex items-center gap-2.5 shadow-lg transition-all transform hover:scale-105 active:scale-95 ${
              voiceState === 'listening'
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/30'
                : voiceState === 'speaking'
                ? 'bg-amber-500 hover:bg-amber-600 text-forest-950 shadow-amber-500/30'
                : 'bg-leaf-500 hover:bg-leaf-400 text-forest-950 shadow-leaf-500/25'
            }`}
          >
            {voiceState === 'listening' ? (
              <>
                <MicOff className="w-4 h-4 animate-bounce" />
                <span>Stop Listening</span>
              </>
            ) : voiceState === 'speaking' ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Stop Speaking</span>
              </>
            ) : voiceState === 'thinking' ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span>Tap to Speak with Sphere AI</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
