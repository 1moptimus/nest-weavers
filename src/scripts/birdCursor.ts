// Animated bird cursor: the logo hummingbird follows the pointer, banks into the direction of travel,
// flutters while moving, swells over clickable things and squeezes on press.
// Only runs for mouse/trackpad users who have not asked for reduced motion; everyone else keeps the
// static bird cursor from styles.css (or the native pointer).

const fine = matchMedia('(hover: hover) and (pointer: fine)');
const calm = matchMedia('(prefers-reduced-motion: reduce)');

if (fine.matches && !calm.matches) {
  const HOT_X = 1; // beak tip inside the 32x31 image (same hotspot as the static cursor)
  const HOT_Y = 18;
  const INTERACTIVE =
    'a, button, summary, select, label, [role="button"], [data-collage]';
  const TEXTUAL =
    'input:not([type="checkbox"],[type="radio"],[type="submit"],[type="button"]), textarea, [contenteditable="true"]';

  const bird = document.createElement('div');
  bird.className = 'bird-cursor';
  bird.setAttribute('aria-hidden', 'true');
  // A manual popover lives in the browser's top layer, so the bird stays above modal dialogs.
  bird.popover = 'manual';
  document.body.append(bird);
  bird.showPopover();
  document.documentElement.classList.add('bird-on');

  let tx = -100; // target (real pointer)
  let ty = -100;
  let x = tx; // drawn position, eased towards the target
  let y = ty;
  let tilt = 0;
  let scale = 1;
  let targetScale = 1;
  let flutter = 0;
  let seen = false;
  let raf = 0;

  let lastDialog: Element | null = null;

  function frame() {
    const dx = tx - x;
    const dy = ty - y;
    x += dx * 0.4;
    y += dy * 0.4;
    const speed = Math.hypot(dx, dy);
    // Bank into horizontal motion, settle back when still.
    tilt += (Math.max(-28, Math.min(28, dx * 1.1)) - tilt) * 0.2;
    scale += (targetScale - scale) * 0.2;
    flutter = speed > 1.5 ? flutter + 0.9 : flutter * 0.85;
    const wob = Math.sin(flutter) * Math.min(speed, 12) * 0.012;
    bird.style.transform = `translate3d(${x - HOT_X}px, ${y - HOT_Y}px, 0) rotate(${tilt}deg) scale(${scale + wob}, ${scale - wob})`;
    raf =
      speed > 0.05 ||
      Math.abs(tilt) > 0.1 ||
      Math.abs(scale - targetScale) > 0.005
        ? requestAnimationFrame(frame)
        : 0;
  }
  const wake = () => {
    if (!raf) raf = requestAnimationFrame(frame);
  };

  addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) {
        seen = true;
        x = tx;
        y = ty;
        bird.classList.add('is-visible');
      }
      // A dialog opened after the bird joined the top layer would cover it: re-show to move it back on top.
      const dialog = document.querySelector('dialog[open]');
      if (dialog !== lastDialog) {
        lastDialog = dialog;
        if (dialog) {
          bird.hidePopover();
          bird.showPopover();
        }
      }
      const target = e.target as Element | null;
      bird.classList.toggle('is-hidden', Boolean(target?.closest(TEXTUAL)));
      targetScale = target?.closest(INTERACTIVE) ? 1.3 : 1;
      wake();
    },
    { passive: true },
  );
  addEventListener('pointerdown', () => {
    targetScale = 0.8;
    wake();
  });
  addEventListener('pointerup', () => {
    targetScale = 1;
    wake();
  });
  document.documentElement.addEventListener('pointerleave', () =>
    bird.classList.remove('is-visible'),
  );
  document.documentElement.addEventListener(
    'pointerenter',
    () => seen && bird.classList.add('is-visible'),
  );
}
