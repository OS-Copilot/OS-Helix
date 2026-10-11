(() => {
  const canvas = document.getElementById('helix');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let phase = 0;

  function draw() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const top = height * .1;
    const span = height * .8;
    const amp = Math.min(width * .24, 104);
    const steps = 32;
    const pointsA = [];
    const pointsB = [];
    for (let i = 0; i <= steps; i++) {
      const y = top + span * i / steps;
      const theta = i / steps * Math.PI * 4 + phase;
      const dx = Math.sin(theta) * amp;
      const depth = Math.cos(theta);
      pointsA.push({x: cx + dx, y, depth});
      pointsB.push({x: cx - dx, y, depth: -depth});
    }
    ctx.lineCap = 'round';
    for (let i = 0; i <= steps; i += 2) {
      const a = pointsA[i], b = pointsB[i];
      ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
      ctx.strokeStyle = 'rgba(72,156,180,.20)';ctx.lineWidth = 2.2;ctx.stroke();
    }
    for (const [points, color] of [[pointsA,'#438fe8'],[pointsB,'#61c681']]) {
      ctx.beginPath();
      points.forEach((p,i) => i ? ctx.lineTo(p.x,p.y) : ctx.moveTo(p.x,p.y));
      ctx.strokeStyle = color;ctx.lineWidth = 8;ctx.shadowBlur = 22;ctx.shadowColor = color;ctx.stroke();ctx.shadowBlur = 0;
      points.filter((_,i) => i % 4 === 0).forEach(p => {
        ctx.beginPath();ctx.arc(p.x,p.y,5.5 + p.depth * 1.5,0,Math.PI*2);
        ctx.fillStyle = '#fff';ctx.fill();ctx.lineWidth = 3;ctx.strokeStyle = color;ctx.stroke();
      });
    }
  }
  function frame() { phase += .012; draw(); if (!reducedMotion.matches) requestAnimationFrame(frame); }
  window.addEventListener('resize', draw);
  reducedMotion.addEventListener('change', () => { if (!reducedMotion.matches) requestAnimationFrame(frame); else draw(); });
  if (reducedMotion.matches) draw(); else requestAnimationFrame(frame);
})();
