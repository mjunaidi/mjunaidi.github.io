document.currentScript =
  document.currentScript ||
  (function () {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

console.log(document.currentScript.getAttribute('position'));

const el = document.createElement('div');

el.id = 'widget';
el.innerText = 'widget';

el.style.width = '180px';
el.style.height = '50px';
el.style.background = 'white';
el.style['box-shadow'] = '0 1rem 3rem rgba(0,0,0,.175)';
el.style['border-radius'] = '1rem';
el.style.padding = '1rem';
el.style['text-align'] = 'center';
el.style.position = 'fixed';

const position = document.currentScript.getAttribute('position');

if (typeof position === 'string' && position.length > 0) {
  const [a, b] = position.split('-');
  if (a === 'left') {
    el.style.left = '1rem';
  }

  switch (a) {
    case 'right':
      el.style.right = '1rem';
      break;
    default:
      el.style.left = '1rem';
  }

  switch (b) {
    case 'top':
      el.style.top = '1rem';
      break;
    default:
      el.style.bottom = '1rem';
  }
} else {
  el.style.left = '1rem';
  el.style.bottom = '1rem';
}
