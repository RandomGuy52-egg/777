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

  // Wait for the spin animation to finish (1 second)
  setTimeout(() => {
    const earnings = Math.floor(Math.random() * 6) + 1;
    moolah += earnings;
    document.getElementById("moolah").textContent = moolah;
  }, 1000);

  // Start cooldown: dim button + countdown
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
