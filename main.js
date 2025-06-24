onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);
};


window.addEventListener('load', () => {
  const overlay = document.querySelector('.overlay-dark');
  const message = document.querySelector('.message');
  const btnNo = document.querySelector('.btn-no');
  const btnYes = document.querySelector('.btn-yes');

  const showDelay = 4000; // 4 segundos até aparecer mensagem e botões

  // Centraliza os botões lado a lado com position relative
  function centralizarBotoes() {
    btnNo.style.position = 'relative';
    btnNo.style.left = '0';
    btnNo.style.top = '0';
    btnNo.style.transform = 'none';
    btnNo.style.opacity = '1';

    btnYes.style.position = 'relative';
    btnYes.style.left = '0';
    btnYes.style.top = '0';
    btnYes.style.transform = 'none';
  }

  // Move botão "Não" dentro da área central 80% da viewport
function moverBotaoNao() {
  const areaWidth = window.innerWidth * 0.8;
  const areaHeight = window.innerHeight * 0.8;

  const btnWidth = btnNo.offsetWidth;
  const btnHeight = btnNo.offsetHeight;

  const minX = (window.innerWidth - areaWidth) / 2;
  const maxX = minX + areaWidth - btnWidth;

  const minY = (window.innerHeight - areaHeight) / 2;
  const maxY = minY + areaHeight - btnHeight;

  // Garante que os valores estão dentro dos limites
  let newX = Math.random() * (maxX - minX) + minX;
  let newY = Math.random() * (maxY - minY) + minY;

  // Ajusta caso passe da borda da viewport (por segurança)
  newX = Math.min(Math.max(newX, 0), window.innerWidth - btnWidth);
  newY = Math.min(Math.max(newY, 0), window.innerHeight - btnHeight);

  btnNo.style.position = 'fixed';
  btnNo.style.left = `${newX}px`;
  btnNo.style.top = `${newY}px`;
  btnNo.style.opacity = '1';
  btnNo.style.transition = 'left 0.3s ease, top 0.3s ease';
  btnNo.style.zIndex = '9999';
}

  setTimeout(() => {
    overlay.classList.add('active');
    message.classList.add('active');
    centralizarBotoes();
  }, showDelay);

  document.addEventListener('mousemove', (e) => {
    const rect = btnNo.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const distancia = Math.hypot(mouseX - btnCenterX, mouseY - btnCenterY);

    if (distancia < 120) {
      moverBotaoNao();
    }
  });

  btnYes.addEventListener('click', () => {
    overlay.classList.remove('active');
    message.innerHTML = '<p>Parabéns! Você aceitou o pedido de namoro. 🎉</p>';
  });

  btnNo.addEventListener('click', (e) => e.preventDefault());

  window.addEventListener('resize', () => {
    centralizarBotoes();
  });
});

