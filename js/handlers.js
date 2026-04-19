import { matches, players } from './data.js';
import { renderMatches, renderPlayers, renderPredictions, renderResults, calculateScores } from './render.js';
import { saveToLocalStorage } from './storage.js';

export function addMatch() {
  const newId = matches.length ? Math.max(...matches.map(m => m.id)) + 1 : 1;
  matches.push({ id: newId, title: "New Match", participants: ["Option 1", "Option 2"], actualWinner: null });
  renderMatches();
}

export function deleteMatch(id) {
  matches = matches.filter(m => m.id !== id);
  renderMatches();
}

export function updateMatchTitle(id, title) {
  const match = matches.find(m => m.id === id);
  if (match) match.title = title;
}

export function addParticipant(id) {
  const match = matches.find(m => m.id === id);
  if (match) match.participants.push("New Option");
  renderMatches();
}

export function updateParticipant(id, idx, val) {
  const match = matches.find(m => m.id === id);
  if (match) match.participants[idx] = val;
}

export function removeParticipant(id, idx) {
  const match = matches.find(m => m.id === id);
  if (match) match.participants.splice(idx, 1);
  renderMatches();
}

export function addPlayer() {
  if (players.length >= 5) return alert("Maximum 5 players!");
  const newId = players.length ? Math.max(...players.map(p => p.id)) + 1 : 1;
  players.push({ id: newId, name: `Player ${players.length + 1}`, picks: {} });
  renderPlayers();
}

export function deletePlayer(id) {
  players = players.filter(p => p.id !== id);
  renderPlayers();
}

export function updatePlayerName(id, name) {
  const player = players.find(p => p.id === id);
  if (player) player.name = name;
}

export function updateEventName() {
  saveToLocalStorage();
}

export function makePick(playerId, matchId, winner) {
  const player = players.find(p => p.id === playerId);
  if (player) player.picks[matchId] = winner;
  renderPredictions();
}

export function randomizePlayerPicks(playerId) {
  const player = players.find(p => p.id === playerId);
  if (!player) return;
  matches.forEach(m => {
    player.picks[m.id] = m.participants[Math.floor(Math.random() * m.participants.length)];
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

export function setTab(n) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
  document.getElementById(`panel${n}`).classList.remove('hidden');

  document.querySelectorAll('button[id^="tab"]').forEach(btn => btn.classList.remove('tab-active'));
  document.getElementById(`tab${n}`).classList.add('tab-active');

  if (n === 0) renderMatches();
  if (n === 1) renderPlayers();
  if (n === 2) renderPredictions();
  if (n === 3) renderResults();
  if (n === 4) calculateScores();

  saveToLocalStorage();
}
