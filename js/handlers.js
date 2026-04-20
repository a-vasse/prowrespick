import { matches, players } from './data.js';
import { renderMatches, renderPlayers, renderPredictions, renderResults, calculateScores } from './render.js';
import { saveToLocalStorage } from './storage.js';

export function addMatch() {
  const newId = matches.length ? Math.max(...matches.map(m => m.id)) + 1 : 1;
  matches.push({
    id: newId,
    title: "New Match",
    participants: ["Option 1", "Option 2"],
    actualWinner: null
  });
  renderMatches();
}

export function deleteMatch(id) {
  const index = matches.findIndex(m => m.id === id);
  if (index !== -1) {
    matches.splice(index, 1);
    renderMatches();
  }
}

export function updateMatchTitle(id, title) {
  const match = matches.find(m => m.id === id);
  if (match) match.title = title;
}

export function addParticipant(matchId) {
  const match = matches.find(m => m.id === matchId);
  if (match) {
    match.participants.push("New Option");
    renderMatches();
  }
}

export function updateParticipant(matchId, index, value) {
  const match = matches.find(m => m.id === matchId);
  if (match) match.participants[index] = value;
}

export function removeParticipant(matchId, index) {
  const match = matches.find(m => m.id === matchId);
  if (match) {
    match.participants.splice(index, 1);
    renderMatches();
  }
}

export function addPlayer() {
  if (players.length >= 5) {
    alert("Maximum 5 players allowed!");
    return;
  }
  const newId = players.length ? Math.max(...players.map(p => p.id)) + 1 : 1;
  players.push({
    id: newId,
    name: `Player ${players.length + 1}`,
    picks: {}
  });
  renderPlayers();
}

export function deletePlayer(id) {
  const index = players.findIndex(p => p.id === id);
  if (index !== -1) {
    players.splice(index, 1);
    renderPlayers();
  }
}

export function updatePlayerName(id, name) {
  const player = players.find(p => p.id === id);
  if (player) player.name = name;
}

export function makePick(playerId, matchId, winner) {
  const player = players.find(p => p.id === playerId);
  if (player) {
    player.picks[matchId] = winner;
    renderPredictions();
  }
}

export function randomizePlayerPicks(playerId) {
  const player = players.find(p => p.id === playerId);
  if (!player) return;

  matches.forEach(match => {
    const randomIndex = Math.floor(Math.random() * match.participants.length);
    player.picks[match.id] = match.participants[randomIndex];
  });
  renderPredictions();
}

export function setActualWinner(matchId, winner) {
  const match = matches.find(m => m.id === matchId);
  if (match) {
    match.actualWinner = winner;
    renderResults();
    calculateScores();
  }
}

export function updateEventName() {
  saveToLocalStorage();
}

export function setTab(n) {
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.add('hidden');
  });

  document.getElementById(`panel${n}`).classList.remove('hidden');

  document.querySelectorAll('button[id^="tab"]').forEach(btn => {
    btn.classList.remove('tab-active');
  });
  document.getElementById(`tab${n}`).classList.add('tab-active');

  switch (n) {
    case 0: renderMatches(); break;
    case 1: renderPlayers(); break;
    case 2: renderPredictions(); break;
    case 3: renderResults(); break;
    case 4: calculateScores(); break;
  }

  saveToLocalStorage();
}

export function initializeGlobalHandlers() {
  console.log("Global handlers initialized");
}
