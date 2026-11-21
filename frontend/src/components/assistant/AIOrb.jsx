import React, { useRef, useEffect } from 'react';

/**
 * AIOrb Component
 * Multicoloured glowing AI orb inspired by the Reference A Sphere design:
 * Electric blue, violet, cyan, soft pink, with white specular highlights.
 * Soft outer glow, blurred luminous edges, and dynamic states (idle, listening, thinking, speaking).
 */
export default function AIOrb({ state = 'idle', size = 160, onClick }) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 2;
    const width = (canvas.width = size * dpr);
    const height = (canvas.height = size * dpr);

    let time = 0;

    const render = () => {
      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const baseRadius = (width / 2) * 0.62;

      // Dynamics based on assistant state
      let pulseSpeed = 1.0;
      let waveAmp = 0.06;

      if (state === 'thinking') {
        pulseSpeed = 3.5;
        waveAmp = 0.12 + Math.sin(time * 6) * 0.04;
      } else if (state === 'listening') {
        pulseSpeed = 2.4;
        waveAmp = 0.10 + Math.sin(time * 4) * 0.03;
      } else if (state === 'speaking') {
        pulseSpeed = 2.0;
        waveAmp = 0.09 + Math.abs(Math.sin(time * 3)) * 0.05;
      }

      // 1. Soft Multi-layered Outer Glow Aura
      const outerGlow = ctx.createRadialGradient(cx, cy, baseRadius * 0.4, cx, cy, baseRadius * 1.6);
      outerGlow.addColorStop(0, 'rgba(56, 189, 248, 0.45)');  // Electric blue
      outerGlow.addColorStop(0.35, 'rgba(139, 92, 246, 0.35)'); // Violet
      outerGlow.addColorStop(0.7, 'rgba(244, 114, 182, 0.25)'); // Soft pink
      outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // 2. Multi-Color Deforming Orb Surface
      const points = 64;
      ctx.beginPath();
      for (let i = 0; i <= points; i++) {
        const theta = (i / points) * Math.PI * 2;
        const w1 = Math.sin(theta * 3 + time * pulseSpeed) * waveAmp;
        const w2 = Math.cos(theta * 5 - time * (pulseSpeed * 0.8)) * (waveAmp * 0.6);
        const r = baseRadius * (1 + w1 + w2);

        const x = cx + Math.cos(theta) * r;
        const y = cy + Math.sin(theta) * r;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      // Iridescent Core Gradient (Reference A palette)
      const grad = ctx.createRadialGradient(
        cx - baseRadius * 0.3,
        cy - baseRadius * 0.3,
        baseRadius * 0.05,
        cx + baseRadius * 0.2,
        cy + baseRadius * 0.2,
        baseRadius * 1.15
      );
      grad.addColorStop(0, '#ffffff');             // Specular White highlight
      grad.addColorStop(0.2, '#38bdf8');           // Electric Blue
      grad.addColorStop(0.5, '#8b5cf6');           // Radiant Violet
      grad.addColorStop(0.75, '#06b6d4');          // Glowing Cyan
      grad.addColorStop(0.95, '#f472b6');          // Soft Pink rim
      grad.addColorStop(1, '#4c1d95');             // Deep Violet edge

      ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(56, 189, 248, 0.8)';
      ctx.shadowBlur = 18 * dpr;
      ctx.fill();
      ctx.shadowBlur = 0;

      // 3. Specular Glare Highlights
      const glare = ctx.createLinearGradient(
        cx - baseRadius * 0.5,
        cy - baseRadius * 0.5,
        cx + baseRadius * 0.4,
        cy + baseRadius * 0.4
      );
      glare.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
      glare.addColorStop(0.35, 'rgba(255, 255, 255, 0.15)');
      glare.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glare;
      ctx.fill();

      // 4. Subtle Surface Ring Arcs
      ctx.save();
      ctx.clip();
      ctx.beginPath();
      for (let j = -1; j <= 1; j++) {
        const lineY = cy + j * 20 * dpr + Math.sin(time * 2 + j) * 6 * dpr;
        ctx.moveTo(cx - baseRadius, lineY);
        ctx.bezierCurveTo(
          cx - baseRadius * 0.3,
          lineY - 8 * Math.sin(time * 3 + j) * dpr,
          cx + baseRadius * 0.3,
          lineY + 8 * Math.sin(time * 3 + j) * dpr,
          cx + baseRadius,
          lineY
        );
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.32)';
      ctx.lineWidth = 1.6 * dpr;
      ctx.stroke();
      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [state, size]);

  return (
    <div
      onClick={onClick}
      className="relative flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 touch-none select-none"
      style={{ width: `${size}px`, height: `${size}px` }}
      title={state === 'thinking' ? 'Analyzing...' : 'Click to interact by voice'}
    >
      <canvas
        ref={canvasRef}
        style={{ width: `${size}px`, height: `${size}px` }}
        className="w-full h-full pointer-events-none drop-shadow-lg"
      />
    </div>
  );
}
