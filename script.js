const diceSelect = document.getElementById("diceCount");
const rollButton = document.getElementById("rollButton");
const results = document.getElementById("results");
const diceContainer = document.getElementById("diceContainer");
const totalSum = document.getElementById("totalSum");

// Случайное число от min до max
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Отображение костей
function renderDice(values) {
  diceContainer.innerHTML = '';
  const faces = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

  values.forEach(v => {
    const die = document.createElement('span');
    die.className = 'die';
    die.textContent = faces[v];
    die.setAttribute('role', 'img');
    die.setAttribute('aria-label', `die showing ${v}`);
    diceContainer.appendChild(die);

    // Анимация тряски
    void die.offsetWidth;
    die.classList.add('shake');
    die.addEventListener('animationend', () => {
      die.classList.remove('shake');
    }, { once: true });
  });
}

// Бросок кубиков
function handleRoll() {
  const n = parseInt(diceSelect.value, 10);
  const values = Array.from({ length: n }, () => randomInt(1, 6));

  renderDice(values);

  totalSum.textContent = "Rolling...";
  results.hidden = false;

  setTimeout(() => {
    const sum = values.reduce((a, b) => a + b, 0);
    totalSum.textContent = `Total: ${sum}`;
  }, 1000); // 1 секунда "анимации"
}

rollButton.addEventListener('click', handleRoll);
