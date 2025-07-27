let moolah = 0;

function rollDice() {
  const dice = document.getElementById("dice");

  const randX = Math.floor(Math.random() * 4 + 1) * 90;
  const randY = Math.floor(Math.random() * 4 + 1) * 90;

  dice.style.transform = `rotateX(${randX}deg) rotateY(${randY}deg)`;

  // Add random amount of moolah (1–6)
  const earnings = Math.floor(Math.random() * 6) + 1;
  moolah += earnings;
  document.getElementById("moolah").textContent = moolah;
}
