// Vi henter elementene fra HTML
const diceSelect = document.getElementById("diceCount");
const rollButton = document.getElementById("rollButton");
const results = document.getElementById("results");
const diceContainer = document.getElementById("diceContainer");
const totalSum = document.getElementById("totalSum");

// Velger tilfeldig et tall fra 1 til 6, som når vi kaster en terning
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Funksjon for å vise terningene på siden
function renderDice(values) {
  diceContainer.innerHTML = ''; // Tømmer tidligere terninger
  const faces = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];// Unicode symboler for terningene 

  values.forEach(v => {
    const die = document.createElement('span');// Lager et nytt element for terningen
    die.className = 'die';// Legger til CSS-klasse
    die.textContent = faces[v];// Viser riktig symbol
    die.setAttribute('role', 'img'); // Tilgjengelighet (screen reader)
    die.setAttribute('aria-label', `die showing ${v}`); // Beskrivelse for skjermleser
    diceContainer.appendChild(die); // Legger til i containeren

    // Legger til en liten "riste"-animajon
    void die.offsetWidth; // Trigger reflow for animasjon
    die.classList.add('shake');
    die.addEventListener('animationend', () => {
      die.classList.remove('shake'); // Fjerner animasjon når den er ferdig
    }, { once: true });
  });
}

// Funksjon for å kaste terningene
function handleRoll() {
  const n = parseInt(diceSelect.value, 10); // Hvor mange terninger bruker vi?
  const values = Array.from({ length: n }, () => randomInt(1, 6));// Lag tilfeldig verdier

  renderDice(values); // Vis terningene

  totalSum.textContent = "Rolling..."; // Midlertidig melding
  results.hidden = false; // Vis resultatseksjonen

  setTimeout(() => {
    const sum = values.reduce((a, b) => a + b, 0);// Regn ut summen
    totalSum.textContent = `Total: ${sum}`;// Vis summen
  }, 600); // Vent 0.6 sekunder for animasjon
}

rollButton.addEventListener('click', handleRoll);// Når brukeren klikker på knappen, kjør handleRoll
