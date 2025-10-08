const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const creatureName = document.getElementById("creature-name");
const creatureID = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

function clearDisplay() {
  creatureName.textContent = "";
  creatureID.textContent = "";
  weight.textContent = "";
  height.textContent = "";
  types.textContent = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
}

function displayCreature(data) {
  creatureName.textContent = data.name.toUpperCase();
  creatureID.textContent = `#${data.id}`;
  weight.textContent = data.weight;
  height.textContent = data.height;

  types.textContent = "";
  data.types.forEach(t => {
    const span = document.createElement("span");
    span.textContent = t.name.toUpperCase() + " ";
    types.appendChild(span);
  });

  hp.textContent = data.stats.find(s => s.name === "hp").base_stat;
  attack.textContent = data.stats.find(s => s.name === "attack").base_stat;
  defense.textContent = data.stats.find(s => s.name === "defense").base_stat;
  specialAttack.textContent = data.stats.find(s => s.name === "special-attack").base_stat;
  specialDefense.textContent = data.stats.find(s => s.name === "special-defense").base_stat;
  speed.textContent = data.stats.find(s => s.name === "speed").base_stat;
}

async function fetchCreature(query) {
  const url = `https://rpg-creature-api.freecodecamp.rocks/api/creature/${query.toLowerCase()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Creature not found");
  return await response.json();
}

async function search() {
  clearDisplay();
  const query = searchInput.value.trim();
  if (!query) {
    alert("Please enter a creature name or ID");
    return;
  }
  try {
    const data = await fetchCreature(query);
    displayCreature(data);
  } catch {
    alert("Creature not found");
  }
}

searchButton.addEventListener("click", search);
searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") search();
});
