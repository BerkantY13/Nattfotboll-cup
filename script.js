function getData() {
  return JSON.parse(localStorage.getItem("cupData")) || {
    teams: [],
    matches: []
  };
}

function calculateTable(data) {
  let table = {};

  // skapa lag
  data.teams.forEach(team => {
    table[team] = {
      name: team,
      points: 0,
      scored: 0,
      conceded: 0
    };
  });

  // räkna matcher
  data.matches.forEach(m => {
    let [s1, s2] = m.score.split("-").map(Number);

    let t1 = table[m.t1];
    let t2 = table[m.t2];

    t1.scored += s1;
    t1.conceded += s2;

    t2.scored += s2;
    t2.conceded += s1;

    if (s1 > s2) t1.points += 3;
    else if (s2 > s1) t2.points += 3;
    else {
      t1.points += 1;
      t2.points += 1;
    }
  });

  return Object.values(table).sort((a, b) =>
    b.points - a.points ||
    (b.scored - b.conceded) - (a.scored - a.conceded) ||
    b.scored - a.scored
  );
}

function updateDisplay() {
  let data = getData();

  // aktuell match
  let current = localStorage.getItem("currentMatch");
  document.getElementById("currentMatch").innerText =
    current || "Ingen match";

  // resultat
  let tbody = document.querySelector("#resultsTable tbody");
  tbody.innerHTML = "";

  data.matches.forEach(m => {
    tbody.innerHTML += `
      <tr>
        <td>${m.t1}</td>
        <td>${m.t2}</td>
        <td>${m.score}</td>
      </tr>`;
  });

  // TABELL
  let tableData = calculateTable(data);
  let tableBody = document.querySelector("#leagueTable tbody");
  tableBody.innerHTML = "";

  tableData.forEach(t => {
    let diff = t.scored - t.conceded;

    tableBody.innerHTML += `
      <tr>
        <td>${t.name}</td>
        <td>${t.points}</td>
        <td>${t.scored}</td>
        <td>${t.conceded}</td>
        <td>${diff}</td>
      </tr>`;
  });
}

setInterval(updateDisplay, 1000);