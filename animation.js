(() => {
  const root = document.documentElement;
  const cursor = document.getElementById('cursorOrb');
  const camera = document.getElementById('heroCamera');
  const layers = [...document.querySelectorAll('.layer')];
  const soundButton = document.getElementById('soundToggle');

  let mx = 0, my = 0, tx = 0, ty = 0, scrollY = window.scrollY;
  let ambientAudio = null;

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

  document
    .querySelectorAll('.cinema-section, .manifest, .contact__panel')
    .forEach((el) => observer.observe(el));

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

  function initAmbientAudio() {
    if (ambientAudio) return;

    ambientAudio = new Audio('audio/ambient.mp3');
    ambientAudio.loop = true;
    ambientAudio.volume = 0.18;
    ambientAudio.preload = 'auto';
  }

  async function startAmbient() {
    initAmbientAudio();

    try {
      ambientAudio.currentTime = ambientAudio.currentTime || 0;
      await ambientAudio.play();
    } catch (e) {
      console.warn('Ambient audio did not start:', e);
    }
  }

  function stopAmbient() {
    if (!ambientAudio) return;
    ambientAudio.pause();
  }

  async function enableAmbient() {
    await startAmbient();

    if (soundButton) {
      soundButton.setAttribute('aria-pressed', 'true');
    }
  }

  function disableAmbient() {
    stopAmbient();

    if (soundButton) {
      soundButton.setAttribute('aria-pressed', 'false');
    }
  }

  // Пытаемся включить сразу
  enableAmbient();

  // Если браузер заблокировал autoplay — включаем после первого действия пользователя
  ['click', 'mousemove', 'scroll', 'keydown', 'touchstart'].forEach((eventName) => {
    window.addEventListener(eventName, enableAmbient, {
      once: true,
      passive: true
    });
  });

  // Кнопка теперь только выключает/включает обратно
  if (soundButton) {
    soundButton.addEventListener('click', async () => {
      const active = soundButton.getAttribute('aria-pressed') === 'true';

      if (active) {
        disableAmbient();
      } else {
        await enableAmbient();
      }
    });
  }
})();