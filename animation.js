(() => {
  const root = document.documentElement;
  const cursor = document.getElementById('cursorOrb');
  const camera = document.getElementById('heroCamera');
  const layers = [...document.querySelectorAll('.layer')];
  const soundButton = document.getElementById('soundToggle');

  let mx = 0, my = 0, tx = 0, ty = 0, scrollY = window.scrollY;
  let audioCtx = null, osc = null, gain = null;

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  window.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
    if (cursor) {
      cursor.style.transform = `translate3d(${e.clientX - 180}px, ${e.clientY - 180}px, 0)`;
    }
  }, { passive: true });

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  }, { passive: true });

  function frame() {
    tx += (mx - tx) * 0.055;
    ty += (my - ty) * 0.055;

    const heroProgress = clamp(scrollY / Math.max(1, window.innerHeight), 0, 1);

    if (camera) {
      const rz = tx * 1.4;
      const rx = -ty * 2.4;
      const dolly = heroProgress * -90;
      camera.style.transform = `translate3d(0, ${dolly}px, 0) rotateX(${rx}deg) rotateY(${rz}deg)`;
    }

    layers.forEach((layer) => {
      const depth = Number(layer.dataset.depth || 0.2);
      const x = tx * depth * 28;
      const y = ty * depth * 22 - scrollY * depth * 0.018;
      layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });

    requestAnimationFrame(frame);
  }
  frame();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('.cinema-section, .manifest, .contact__panel').forEach((el) => observer.observe(el));

  // Новые контентные секции — reveal при скролле
  const secObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('sec-hidden');
        entry.target.classList.add('sec-visible');
        secObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.sec-content').forEach((el) => {
    el.classList.add('sec-hidden');
    secObserver.observe(el);
  });

  function startAmbient() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    osc = audioCtx.createOscillator();
    gain = audioCtx.createGain();

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 180;

    osc.type = 'sine';
    osc.frequency.value = 48;
    gain.gain.value = 0.018;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
  }

  function stopAmbient() {
    if (!audioCtx) return;
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
    setTimeout(() => {
      try { osc.stop(); audioCtx.close(); } catch(e) {}
      audioCtx = null; osc = null; gain = null;
    }, 450);
  }

  if (soundButton) {
    soundButton.addEventListener('click', async () => {
      const active = soundButton.getAttribute('aria-pressed') === 'true';
      if (active) {
        soundButton.setAttribute('aria-pressed', 'false');
        stopAmbient();
      } else {
        soundButton.setAttribute('aria-pressed', 'true');
        startAmbient();
      }
    });
  }
})();