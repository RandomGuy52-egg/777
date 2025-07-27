let moolah = 0;
let canRoll = true;

function rollDice() {
  if (!canRoll) return;

  const dice = document.getElementById("dice");
  const rollBtn = document.getElementById("rollBtn");
  const confettiContainer = document.getElementById("confetti-container");

  canRoll = false;
  rollBtn.classList.add("disabled");
  rollBtn.textContent = "2.00";

  let countdown = 2.00;
  const interval = setInterval(() => {
    countdown -= 0.1;
    rollBtn.textContent = countdown.toFixed(2);
  }, 100);

  const randX = Math.floor(Math.random() * 4 + 1) * 90;
  const randY = Math.floor(Math.random() * 4 + 1) * 90;

  dice.style.transform = `rotateX(${randX}deg) rotateY(${randY}deg)`;

  setTimeout(() => {
    clearInterval(interval);
    const earnings = Math.floor(Math.random() * 6) + 1;
    moolah += earnings;
    document.getElementById("moolah").textContent = moolah;

    rollBtn.textContent = "ROLL DAT DICE";
    rollBtn.classList.remove("disabled");
    canRoll = true;

    launchConfetti(confettiContainer);
  }, 2000);
}

function launchConfetti(container) {
  container.innerHTML = "";

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "absolute";
    confetti.style.width = "6px";
    confetti.style.height = "6px";
    confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.left = "50%";
    confetti.style.top = "50%";
    confetti.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
    confetti.style.opacity = 1;
    confetti.style.borderRadius = "2px";

    const dx = (Math.random() - 0.5) * 200;
    const dy = (Math.random() - 0.5) * 200;

    confetti.animate([
      { transform: `translate(-50%, -50%)`, opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
    ], {
      duration: 1000 + Math.random() * 500,
      easing: "ease-out",
      fill: "forwards"
    });

    container.appendChild(confetti);
  }
}
