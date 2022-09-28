javascript: (function () {
  const name = 'auto-scroll';
  const scriptUrl = `https://tomyo.github.io/auto-scroll/components/${name}.js`;
  const newScript = document.createElement('script');
  const script = document.querySelector(`#_${name}`);
  const element = document.querySelector(name);

  if (script && element) {
    element.stop();
    element.remove();
    script.remove();
    return;
  }

  newScript.id = `_${name}`;
  newScript.src = scriptUrl;
  newScript.type = 'module';
  document.body.appendChild(newScript);
  document.body.appendChild(document.createElement(name));
})();