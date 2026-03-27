let data = JSON.parse(localStorage.getItem("cupData")) || {
  teams: [],
  matches: []
};

function save() {
  localStorage.setItem("cupData", JSON.stringify(data));
}

function addTeam() {
  let name = document.getElementById("teamName").value;
  if (!name) return;

  data.teams.push(name);
  save();
  updateTeams();

  document.getElementById("teamName").value = "";
}

function removeTeam() {
  let teamToRemove = document.getElementById("removeTeamSelect").value;
  if (!teamToRemove) return;

  data.teams = data.teams.filter(team => team !== teamToRemove);

  data.matches = data.matches.filter(match =>
    match.t1 !== teamToRemove && match.t2 !== teamToRemove
  );

  let currentMatch = localStorage.getItem("currentMatch");
  if (currentMatch && currentMatch.includes(teamToRemove)) {
    localStorage.removeItem("currentMatch");
  }

  save();
  updateTeams();
}
function updateTeams() {
  let t1 = document.getElementById("team1");
  let t2 = document.getElementById("team2");
  let removeSelect = document.getElementById("removeTeamSelect");

  t1.innerHTML = "";
  t2.innerHTML = "";
  removeSelect.innerHTML = "";

  if (data.teams.length === 0) {
    t1.innerHTML = '<option value="">Inga lag</option>';
    t2.innerHTML = '<option value="">Inga lag</option>';
    removeSelect.innerHTML = '<option value="">Inga lag</option>';
    return;
  }

  data.teams.forEach(team => {
    t1.innerHTML += `<option value="${team}">${team}</option>`;
    t2.innerHTML += `<option value="${team}">${team}</option>`;
    removeSelect.innerHTML += `<option value="${team}">${team}</option>`;
  });
}

function startMatch() {
  let t1 = document.getElementById("team1").value;
  let t2 = document.getElementById("team2").value;

  if (t1 === t2) return alert("Välj två olika lag!");

  localStorage.setItem("currentMatch", t1 + " vs " + t2);
}

function saveResult() {
  let t1 = document.getElementById("team1").value;
  let t2 = document.getElementById("team2").value;
  let s1 = document.getElementById("score1").value;
  let s2 = document.getElementById("score2").value;

  if (s1 === "" || s2 === "") return;

  data.matches.push({
    t1: t1,
    t2: t2,
    score: s1 + "-" + s2
  });

  save();

  document.getElementById("score1").value = "";
  document.getElementById("score2").value = "";
}

function clearAllData() {
  data = {
    teams: [],
    matches: []
  };

  localStorage.removeItem("currentMatch");
  save();
  updateTeams();
}

updateTeams();