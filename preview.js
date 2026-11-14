'use strict';
(() => {
  const desktop = document.querySelector('#desktop');
  const images = [...document.querySelectorAll('.wallpaper')];
  const choices = [...document.querySelectorAll('.wallpaper-choice')];
  const titles = choices.map(choice => choice.querySelector('strong').textContent);
  const toggle = document.querySelector('#toggle-ui');
  const fullscreen = document.querySelector('#fullscreen');
  const toast = document.querySelector('#toast');
  let toastTimer;
  function announce(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('visible');
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 4000);
  }
  function selectWallpaper(index) {
    if (!Number.isInteger(index) || index < 0 || index >= images.length) return;
    if (!images[index].complete || images[index].naturalWidth === 0) {
      announce('This wallpaper is unavailable. The current one is kept.');
      return;
    }
    images.forEach((image, i) => {
      image.classList.toggle('active', i === index);
      image.setAttribute('aria-hidden', String(i !== index));
    });
    choices.forEach((choice, i) => {
      choice.classList.toggle('selected', i === index);
      choice.setAttribute('aria-pressed', String(i === index));
    });
    document.querySelector('#image-counter').textContent = `${String(index + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;
    document.querySelector('#image-title').textContent = titles[index];
  }
  choices.forEach((choice, index) => choice.addEventListener('click', () => selectWallpaper(index)));
  images.forEach((image, index) => {
    image.setAttribute('aria-hidden', String(index !== 0));
    image.addEventListener('error', () => {
      choices[index].disabled = true;
      choices[index].title = 'Image unavailable';
      if (image.classList.contains('active')) {
        const fallback = images.findIndex(candidate => candidate.complete && candidate.naturalWidth > 0);
        if (fallback !== -1) selectWallpaper(fallback);
      }
      announce('An image is unavailable. Check the theme's backgrounds folder.');
    });
  });
  toggle.addEventListener('click', () => {
    const hidden = desktop.classList.toggle('no-ui');
    document.querySelector('#desktop-ui').setAttribute('aria-hidden', String(hidden));
    toggle.setAttribute('aria-pressed', String(hidden));
    toggle.textContent = hidden ? 'Show interface' : 'Hide interface';
  });
  fullscreen.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (desktop.requestFullscreen) await desktop.requestFullscreen();
      else announce('Fullscreen is unavailable in this browser.');
    } catch {
      announce('Fullscreen refused. The preview stays usable in the page.');
    }
  });
  document.addEventListener('fullscreenchange', () => {
    fullscreen.textContent = document.fullscreenElement ? 'Exit fullscreen' : 'Enlarge ↗';
  });
  document.querySelectorAll('[data-color]').forEach(button => {
    button.addEventListener('click', async () => {
      const color = button.dataset.color;
      try {
        if (!navigator.clipboard?.writeText) throw new Error('clipboard unavailable');
        await navigator.clipboard.writeText(color);
        announce(`${color} copied to the clipboard.`);
      } catch {
        announce(`Automatic copy unavailable. Select the hex: ${color}`);
      }
    });
  });
})();
