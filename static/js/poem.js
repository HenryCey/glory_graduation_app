document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('toggle-poem');
  const full = document.getElementById('poem-full');

  // helper: reveal lines with stagger
  function revealLines(container) {
    const lines = container.querySelectorAll('.poem-line');
    lines.forEach((line, i) => {
      line.classList.remove('fade-in');
      line.style.animationDelay = `${i * 0.08}s`;
      setTimeout(() => line.classList.add('fade-in'), 10 + i * 60);
    });
  }

  function hideLines(container) {
    const lines = container.querySelectorAll('.poem-line');
    lines.forEach(line => {
      line.classList.remove('fade-in');
      line.style.animationDelay = '';
    });
  }

  toggleBtn.addEventListener('click', function () {
    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';

    if (!expanded) {
      full.classList.remove('visually-hidden');
      full.setAttribute('aria-hidden', 'false');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.textContent = 'Hide Poem';
      revealLines(full);
      revealLines(document.querySelector('.poem-preview'));
      setTimeout(() => {
        full.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 320);
    } else {
      hideLines(full);
      full.classList.add('visually-hidden');
      full.setAttribute('aria-hidden', 'true');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.textContent = 'Read Full Poem';
      toggleBtn.focus();
    }
  });

  // Typing effect for preview
  function typeLine(lineEl, delay = 0) {
    const text = lineEl.textContent;
    lineEl.textContent = "";
    [...text].forEach((char, i) => {
      setTimeout(() => {
        lineEl.textContent += char;
      }, delay + i * 50);
    });
  }

  const previewLines = document.querySelectorAll('.poem-preview .poem-line');
  previewLines.forEach((line, idx) => {
    typeLine(line, idx * 1000);
  });
});
