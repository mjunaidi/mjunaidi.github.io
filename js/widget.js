document.currentScript =
  document.currentScript ||
  (function () {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

console.log(document.currentScript.getAttribute('props'));
