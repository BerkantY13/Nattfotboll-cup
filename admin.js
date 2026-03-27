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

function updateTeams() {
  let t1 = document.getElementById("team1");
  let t2 = document.getElementById("team2");

  t1.innerHTML = "";
  t2.innerHTML = "";

  data.teams.forEach(team => {
    t1.innerHTML += `<option>${team}</option>`;
    t2.innerHTML += `<option>${team}</option>`;
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

updateTeams();