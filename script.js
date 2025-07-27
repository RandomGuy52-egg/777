let moolah = 0;
let rolling = false;

document.getElementById("menuButton").addEventListener("click", () => {
  document.getElementById("menuPopup").classList.toggle("hidden");
});

function rollDice() {
  if (rolling) return;
  rolling = true;

  const dice = document.getElementById("dice");
  const rollButton = document.getElementById("rollButton");

  const randX = Math.floor(Math.random() * 4 + 1) * 90;
  const randY = Math.floor(Math.random() * 4 + 1) * 90;
  dice.style.transform = `rotateX(${randX}deg) rotateY(${randY}deg)`;

  let countdown = 2.0;
  rollButton.disabled = true;

  const countdownInterval = setInterval(() => {
    countdown -= 0.1;
    rollButton.textContent = countdown.toFixed(2);
    if (countdown <= 0) {
      clearInterval(countdownInterval);
      rollButton.disabled = false;
      rollButton.textContent = "ROLL DAT DICE";
    }
  }, 100);

  setTimeout(() => {
    const earnings = Math.floor(Math.random() * 6) + 1;
    moolah += earnings;
    document.getElementById("moolah").textContent = moolah;
    spawnConfetti();
    rolling = false;
  }, 1000);
}

function spawnConfetti() {
  const container = document.getElementById("confetti-container");
  container.innerHTML = '';

  for (let i = 0; i < 20; i++) {
    const piece = document.createElement("div");
    piece.style.position = "absolute";
    piece.style.width = "6px";
    piece.style.height = "6px";
    piece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    piece.style.left = "50%";
    piece.style.top = "50%";
    piece.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
    piece.style.opacity = 1;
    piece.style.borderRadius = "50%";

    container.appendChild(piece);

    setTimeout(() => {
      piece.style.transition = "transform 1s, opacity 1s";
      const dx = (Math.random() - 0.5) * 100;
      const dy = (Math.random() - 0.5) * 100;
      piece.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.random() * 720}deg)`;
      piece.style.opacity = 0;
    }, 0);
  }
}