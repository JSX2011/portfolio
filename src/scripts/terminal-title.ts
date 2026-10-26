const heading = document.querySelector<HTMLElement>('.terminal-heading');

if (heading) {
  const root = document.documentElement;
  const letters = Array.from(heading.querySelectorAll<HTMLElement>('[data-terminal-char]'));
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const characterDelay = 55;
  const lineDelay = 260;
  let timer = 0;
  let index = 0;
  let caret: HTMLElement | undefined;

  const motionOff = () => reducedMotion.matches || root.hasAttribute('data-motion');

  function moveCaret(letter: HTMLElement, position: 'before' | 'after') {
    caret?.removeAttribute('data-caret');
    caret = letter;
    caret.dataset.caret = position;
  }

  function complete() {
    clearTimeout(timer);
    heading!.dataset.terminalState = 'complete';
    delete root.dataset.terminalBoot;
    letters.forEach(letter => letter.removeAttribute('data-revealed'));
    if (letters.length) moveCaret(letters[letters.length - 1], 'after');
  }

  function typeNext() {
    if (motionOff() || index >= letters.length) return complete();

    const letter = letters[index];
    letter.dataset.revealed = '';
    moveCaret(letter, 'after');
    index++;
    if (index === letters.length) return complete();

    const nextLine = letter.closest('[data-terminal-line]') !== letters[index].closest('[data-terminal-line]');
    timer = window.setTimeout(typeNext, nextLine ? lineDelay : characterDelay);
  }

  if (root.dataset.terminalBoot === 'pending' && !motionOff() && letters.length) {
    letters.forEach(letter => letter.removeAttribute('data-caret'));
    heading.dataset.terminalState = 'typing';
    moveCaret(letters[0], 'before');
    delete root.dataset.terminalBoot;
    timer = window.setTimeout(typeNext, 180);
  }

  // A reading preference can stop the effect immediately, even mid-word.
  const stopIfReduced = () => { if (motionOff()) complete(); };
  reducedMotion.addEventListener('change', stopIfReduced);
  new MutationObserver(stopIfReduced).observe(root, { attributes: true, attributeFilter: ['data-motion'] });
  window.addEventListener('pagehide', complete);
}
