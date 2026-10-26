// @ts-nocheck
// El contenido no depende de JavaScript; solo se preparan elementos fuera de pantalla.
export function initMotion() {
  const root = document.documentElement;
  const route = document.querySelector('.story-route');
  const path = document.querySelector('.story-path');
  if (!route || !path || !window.IntersectionObserver || !Element.prototype.animate) return;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const contrast = matchMedia('(forced-colors: active)');
  const reveals = new Map();
  const seen = new WeakSet();
  const targets = [...document.querySelectorAll('.section-heading, .story-stop-copy, .story-stop-photo, .story-destination, .memory, .guest-details-grid article, .closing')];
  const stops = [...path.querySelectorAll('.story-stop')];
  const vine = route.querySelector('.rose-vine');
  const stem = vine.querySelector('.vine-progress');
  const rose = route.querySelector('.travelling-rose');
  const petals = document.createElement('div');
  petals.className = 'petal-layer';
  petals.setAttribute('aria-hidden', 'true');
  document.body.append(petals);
  const falling = new Set();
  let reduced = false;
  let frame = 0;
  let top = 0;
  let left = 0;
  let height = 1;
  let viewport = innerHeight;
  let progress = 0;
  let points = [];
  let milestones = [];
  let lastScroll = scrollY;
  let petalDistance = 0;
  let lastPetal = 0;

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting || reduced) continue;
      observer.unobserve(entry.target);
      seen.add(entry.target);
      const animation = reveals.get(entry.target);
      if (entry.target.contains(document.activeElement)) animation?.cancel();
      else {
        const play = () => { if (!reduced && reveals.get(entry.target) === animation) animation?.play(); };
        const image = entry.target.querySelector('img');
        if (image && !image.complete) image.decode().catch(() => {}).then(play);
        else play();
      }
    }
  }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });

  function prepareReveals() {
    for (const target of targets) {
      if (seen.has(target) || reveals.has(target) || target.getBoundingClientRect().top < viewport) continue;
      const photograph = target.matches('.story-stop-photo, .memory');
      const stagger = target.matches('.memory') && innerWidth > 700 ? Number(target.querySelector('[data-photo]').dataset.photo) % 3 * 140 : 0;
      const animation = target.animate([
        { opacity: 0, transform: `translateY(${photograph ? 44 : 24}px)`, offset: 0 },
        { opacity: .18, transform: `translateY(${photograph ? 26 : 14}px)`, offset: .32 },
        { opacity: 1, transform: 'translateY(0)', offset: 1 }
      ], { duration: photograph ? 2000 : 1100, delay: stagger, easing: 'cubic-bezier(.25,.1,.25,1)', fill: 'both' });
      animation.pause();
      animation.currentTime = 0;
      reveals.set(target, animation);
      animation.finished.catch(() => {}).finally(() => {
        if (reveals.get(target) === animation) reveals.delete(target);
        animation.cancel();
      });
      observer.observe(target);
    }
  }
  function clearPetals() {
    falling.forEach(animation => animation.cancel());
    falling.clear();
    petals.replaceChildren();
  }
  function dropPetal(x, y) {
    if (reduced || contrast.matches || document.hidden || falling.size >= (innerWidth < 700 ? 8 : 14)) return;
    const petal = document.createElement('span');
    petal.className = 'rose-petal';
    const turn = Math.random() * 100 - 50;
    const drift = Math.random() * 100 - 50;
    const distance = Math.min(viewport * .55, 420);
    const size = .65 + Math.random() * .55;
    const position = (dx, dy, angle) => `translate3d(${x + dx}px,${y + dy}px,0) rotate(${angle}deg) scale(${size})`;
    petals.append(petal);
    const animation = petal.animate([
      { opacity: 0, transform: position(0, 0, turn), offset: 0 },
      { opacity: .78, transform: position(drift * -.25, distance * .16, turn + 25), offset: .18 },
      { opacity: .6, transform: position(drift * .8, distance * .65, turn + 115), offset: .65 },
      { opacity: 0, transform: position(drift, distance, turn + 190), offset: 1 }
    ], { duration: 3000 + Math.random() * 900, easing: 'linear' });
    falling.add(animation);
    animation.finished.catch(() => {}).finally(() => { falling.delete(animation); petal.remove(); });
  }
  function updatePath(now) {
    frame = 0;
    const target = Math.max(0, Math.min(1, (scrollY + viewport * .62 - top) / height));
    progress = reduced ? 1 : Math.abs(target - progress) < .0002 ? target : progress + (target - progress) * .14;
    route.style.setProperty('--journey-progress', progress.toFixed(5));
    if (points.length) {
      const index = progress * (points.length - 1);
      const start = points[Math.floor(index)];
      const end = points[Math.min(points.length - 1, Math.floor(index) + 1)];
      const fraction = index % 1;
      const x = start.x + (end.x - start.x) * fraction;
      const y = start.y + (end.y - start.y) * fraction;
      rose.style.transform = `translate3d(${x - 24}px,${y - 30}px,0) rotate(${Math.sin(progress * Math.PI * 12) * 12}deg)`;
      rose.style.opacity = Math.min(1, progress * 30, (1 - progress) * 30).toFixed(3);
      stops.forEach((stop, i) => stop.classList.toggle('is-passed', progress >= milestones[i]));
      const delta = Math.abs(scrollY - lastScroll);
      petalDistance += delta;
      lastScroll = scrollY;
      if (!reduced && petalDistance > 85 && now - lastPetal > 180) {
        const onPath = target > 0 && target < 1;
        const gutter = innerWidth < 700 ? .025 : .055;
        const side = Math.random() < .5 ? gutter : 1 - gutter;
        dropPetal(onPath ? left + x : innerWidth * side, onPath ? top + y - scrollY : viewport * (.08 + Math.random() * .2));
        petalDistance = 0;
        lastPetal = now;
      }
    }
    if (!reduced && Math.abs(target - progress) >= .0002) schedule();
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(updatePath); }
  function measure() {
    const rect = path.getBoundingClientRect();
    viewport = innerHeight;
    top = rect.top + scrollY;
    left = rect.left;
    height = path.offsetHeight || 1;
    const axis = innerWidth <= 700 ? 17 : rect.width / 2;
    const amplitude = innerWidth <= 700 ? 18 : innerWidth <= 1000 ? 32 : 60;
    const markers = stops.map(stop => {
      const marker = stop.querySelector('.story-marker').getBoundingClientRect();
      return marker.top + marker.height / 2 - rect.top;
    });
    milestones = markers.map(y => y / height);
    const nodes = [0, ...markers, height];
    let d = `M${axis} 0`;
    for (let i = 1; i < nodes.length; i++) {
      const a = nodes[i - 1];
      const b = nodes[i];
      d += ` C${axis - amplitude} ${a + (b - a) / 3},${axis + amplitude} ${a + (b - a) * 2 / 3},${axis} ${b}`;
    }
    vine.setAttribute('viewBox', `0 0 ${rect.width} ${height}`);
    vine.querySelectorAll('path').forEach(node => node.setAttribute('d', d));
    const length = stem.getTotalLength();
    points = Array.from({ length: 201 }, (_, i) => stem.getPointAtLength(length * i / 200));
    route.classList.add('is-vine-ready');
    schedule();
  }
  function syncMotion() {
    reduced = preference.matches || root.dataset.motion === 'reduce';
    observer.disconnect();
    if (reduced) {
      reveals.forEach(animation => animation.cancel());
      reveals.clear();
      clearPetals();
    } else prepareReveals();
    lastScroll = scrollY;
    petalDistance = 0;
    schedule();
  }
  preference.addEventListener('change', syncMotion);
  contrast.addEventListener('change', clearPetals);
  addEventListener('focusin', ({ target }) => {
    reveals.forEach((animation, node) => {
      if (node.contains(target)) { seen.add(node); observer.unobserve(node); animation.cancel(); }
    });
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) clearPetals(); });
  new MutationObserver(syncMotion).observe(root, { attributes: true, attributeFilter: ['data-motion'] });
  if (window.ResizeObserver) new ResizeObserver(measure).observe(path);
  addEventListener('resize', measure, { passive: true });
  addEventListener('scroll', schedule, { passive: true });
  document.fonts.ready.then(measure);
  measure();
  syncMotion();
}
