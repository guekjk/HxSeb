/* script.js — Wedding Invite: Sebastian & Hui Xin */

(function () {
  'use strict';

  /* ── Petal spawner ──────────────────────────────────── */
  const PETAL_COUNT = 28;
  const container   = document.getElementById('petalsContainer');

  function spawnPetals() {
    for (let i = 0; i < PETAL_COUNT; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';

      const left      = Math.random() * 100;          // vw %
      const size      = 12 + Math.random() * 14;      // px
      const duration  = 6  + Math.random() * 9;       // s
      const delay     = Math.random() * 10;            // s
      const drift     = (Math.random() - 0.5) * 120;  // px horizontal drift

      petal.style.cssText = `
        left:             ${left}vw;
        width:            ${size}px;
        height:           ${size * 1.35}px;
        animation-duration: ${duration}s;
        animation-delay:  ${delay}s;
        --drift:          ${drift}px;
      `;

      /* Override the translateX inside the keyframe using a CSS custom property
         by re-defining the animation inline for drift */
      petal.style.animationName = 'petalFall';
      container.appendChild(petal);

      /* Remove and re-add so petals loop continuously */
      petal.addEventListener('animationend', () => {
        petal.style.animationDelay = '0s';
        petal.style.left = `${Math.random() * 100}vw`;
      });
    }
  }

  /* Use a more elaborate per-petal keyframe for horizontal drift */
  function injectPetalStyles() {
    const style = document.createElement('style');
    // Override default petalFall to include horizontal drift per petal
    style.textContent = `
      @keyframes petalFall {
        0%   { opacity: 0;   transform: translateY(0)      rotate(0deg)   translateX(0); }
        8%   { opacity: 0.85; }
        90%  { opacity: 0.5; }
        100% { opacity: 0;   transform: translateY(110vh)  rotate(400deg) translateX(var(--drift, 50px)); }
      }
    `;
    document.head.appendChild(style);
  }

  /* ── Envelope click handler ─────────────────────────── */
  const envelope  = document.getElementById('envelope');
  const flap      = document.getElementById('flap');
  const card      = document.getElementById('card');
  const clickHint = document.getElementById('clickHint');
  let   isOpen    = false;

  function openEnvelope() {
    if (isOpen) return;
    isOpen = true;

    /* 1. Open flap (CSS 3-D rotate) */
    flap.classList.add('open');

    /* 2. Hide hint */
    if (clickHint) {
      clickHint.style.transition = 'opacity 0.3s';
      clickHint.style.opacity    = '0';
      setTimeout(() => { clickHint.style.display = 'none'; }, 350);
    }

    /* 3. After flap opens, slide card up and fade envelope away */
    setTimeout(() => {
      envelope.style.transition = 'opacity 0.6s ease';
      envelope.style.opacity    = '0.12';
      envelope.style.pointerEvents = 'none';
      card.classList.add('visible');
    }, 500);
  }

  envelope.addEventListener('click', openEnvelope);

  /* Keyboard accessibility */
  envelope.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openEnvelope();
    }
  });

  /* ── Init ───────────────────────────────────────────── */
  injectPetalStyles();
  spawnPetals();
})();
