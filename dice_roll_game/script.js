function rollDice() {
  const dice = document.getElementById("dice");

  // Random angle for each axis
  const randX = Math.floor(Math.random() * 4 + 1) * 90;
  const randY = Math.floor(Math.random() * 4 + 1) * 90;

  // Rotate the dice
  dice.style.transform = `rotateX(${randX}deg) rotateY(${randY}deg)`;
}
