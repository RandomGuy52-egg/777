let moolah = 0;
let canRoll = true;

function rollDice() {
  if (!canRoll) return; // prevent spamming

  canRoll = false;

  const dice = document.getElementById("dice");

  const randX = Math.floor(Math.random() * 4 + 1) * 90;
  const randY = Math.floor(Math.random() * 4 + 1) * 90;

  dice.style.transform = `rotateX(${randX}deg) rotateY(${randY}deg)`;

  const earnings = Math.floor(Math.random() * 6) + 1;
  moolah += earnings;
  document.getElementById("moolah").textContent = moolah;

  setTimeout(() => {
    canRoll = true;
  }, 2000);
}
