let moolah = 0;
let rolling = false;
let diceCount = 1;
let maxDice = 4;
let rollCooldown = 2000;
let currentSkin = 'classic';
let dicePrice = 200;
let multiplier = 1;

const diceContainer = document.getElementById("diceContainer");
const moolahDisplay = document.getElementById("moolah");
const rollButton = document.getElementById("rollButton");

function createDice(id) {
  const scene = document.createElement('div');
  scene.className = 'scene';
  scene.id = 'scene-' + id;

  const dice = document.createElement('div');
  dice.className = 'dice';
  dice.id = 'dice-' + id;

  const faces = [
    ['center'], // 1
    ['top-left', 'bottom-right'], // 2
    ['top-left', 'center', 'bottom-right'], // 3
    ['top-left', 'top-right', 'bottom-left', 'bottom-right'], // 4
    ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'], // 5
    ['top-left', 'middle-left', 'bottom-left', 'top-right', 'middle-right', 'bottom-right'] // 6
  ];

  for (let i = 0; i < 6; i++) {
    const face = document.createElement('div');
    face.className = `face ${['one','two','three','four','five','six'][i]}`;
    for (const dotClass of faces[i]) {
      const dot = document.createElement('div');
      dot.className = 'dot ' + dotClass;
      face.appendChild(dot);
    }
    face.setAttribute('data-val', i + 1);
    dice.appendChild(face);
  }

  applySkin(currentSkin, dice);
  scene.appendChild(dice);
  diceContainer.appendChild(scene);
}

function updateDiceDisplay() {
  diceContainer.innerHTML = '';
  for (let i = 0; i < diceCount; i++) {
    createDice(i);
  }
}

function rollDice() {
  if (rolling) return;
  rolling = true;
  rollButton.disabled = true;
  rollButton.classList.add('cooldown');

  let total = 0;

  for (let i = 0; i < diceCount; i++) {
    const dice = document.getElementById(`dice-${i}`);
    const value = Math.floor(Math.random() * 6) + 1;
    total += value;

    const rotationX = Math.floor(Math.random() * 4 + 1) * 90;
    const rotationY = Math.floor(Math.random() * 4 + 1) * 90;

    dice.setAttribute("data-roll", value);
    dice.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
  }

  setTimeout(() => {
    const earnings = total * multiplier;
    moolah += earnings;
    moolahDisplay.textContent = moolah;
    spawnConfetti();
    rolling = false;
    rollButton.disabled = false;
    rollButton.classList.remove('cooldown');
  }, rollCooldown);
}

function applySkin(skin, diceElement) {
  if (!diceElement) {
    document.querySelectorAll('.dice').forEach(d => applySkin(skin, d));
    currentSkin = skin;
    return;
  }
  switch (skin) {
    case 'gradient':
      diceElement.querySelectorAll('.face').forEach(face => {
        face.style.background = 'linear-gradient(135deg, purple, pink)';
        face.querySelectorAll('.dot').forEach(dot => dot.style.background = 'white');
      });
      break;
    case 'black':
      diceElement.querySelectorAll('.face').forEach(face => {
        face.style.background = 'black';
        face.querySelectorAll('.dot').forEach(dot => dot.style.background = 'white');
      });
      break;
    default:
      diceElement.querySelectorAll('.face').forEach(face => {
        face.style.background = 'white';
        face.querySelectorAll('.dot').forEach(dot => dot.style.background = 'black');
      });
  }
}

function spawnConfetti() {
  // Placeholder: use confetti.js or your fav library
  console.log("🎉 Confetti goes zoom");
}

function toggleMenu() {
  document.getElementById("menu-popup").classList.toggle("hidden");
}

function buyUpgrade(type) {
  if (type === 'dice' && diceCount < maxDice && moolah >= dicePrice) {
    moolah -= dicePrice;
    diceCount++;
    dicePrice += 200;
    updateDiceDisplay();
  } else if (type === 'auto' && moolah >= 1000) {
    moolah -= 1000;
    setInterval(() => rollDice(), rollCooldown + 200);
  } else if (type === 'multiplier' && moolah >= 500) {
    moolah -= 500;
    multiplier = 2;
  }
  moolahDisplay.textContent = moolah;
}
