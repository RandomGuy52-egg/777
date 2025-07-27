let moolah = 0;
let canRoll = true;

function rollDice() {
  if (!canRoll) return;

  canRoll = false;

  const dice = document.getElementById("dice");
  const button = document.getElementById("rollBtn");

  const randX = Math.floor(Math.random() * 4 + 1) * 90;
  const randY = Math.floor(Math.random() * 4 + 1) * 90;

  dice.style.transform = `rotateX(${randX}deg) rotateY(${randY}deg)`;

  setTimeout(() => {
    const earnings = Math.floor(Math.random() * 6) + 1;
    moolah += earnings;
    document.getElementById("moolah").textContent = moolah;

    create3DConfetti();
  }, 1000);

  button.classList.add('dimmed');

  let countdown = 2.00;
  button.textContent = countdown.toFixed(2);

  const interval = setInterval(() => {
    countdown -= 0.01;
    if (countdown <= 0) {
      clearInterval(interval);
      button.textContent = "ROLL DAT DICE";
      button.classList.remove('dimmed');
      canRoll = true;
    } else {
      button.textContent = countdown.toFixed(2);
    }
  }, 10);
}

function create3DConfetti() {
  const container = document.getElementById('confetti-container');
  const colors = ['#f94144', '#f3722c', '#f9844a', '#f9c74f', '#90be6d', '#43aa8b', '#577590'];
  const count = 30;

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti-piece');
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    confetti.style.left = '50%';
    confetti.style.top = '50%';

    container.appendChild(confetti);

    const translateX = (Math.random() - 0.5) * 300;
    const translateY = (Math.random() - 0.5) * 300;
    const translateZ = (Math.random() - 0.5) * 300;

    const rotateX = Math.random() * 720;
    const rotateY = Math.random() * 720;
    const rotateZ = Math.random() * 720;

    confetti.animate([
      { transform: 'translate3d(0,0,0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)', opacity: 1 },
      { transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`, opacity: 0 }
    ], {
      duration: 2000,
      easing: 'ease-out',
      fill: 'forwards'
    });

    setTimeout(() => {
      confetti.remove();
    }, 2000);
  }
}
