import { matches, players } from './data.js';

export function renderHeader() {
  document.getElementById('header').innerHTML = `
    <h1 class="text-4xl font-bold flex items-center gap-3">
      <span class="text-yellow-400">👊🏻</span> Mania Oracle
    </h1>
    <div class="flex gap-3">
      <button onclick="newEvent()" class="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-2xl flex items-center gap-2 text-sm">
        <i class="fas fa-plus"></i> New Event
      </button>
      <button onclick="exportEvent()" class="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-2xl flex items-center gap-2 text-sm">
        <i class="fas fa-download"></i> Export
      </button>
      <button onclick="showImportModal()" class="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-2xl flex items-center gap-2 text-sm">
        <i class="fas fa-upload"></i> Import
      </button>
    </div>
  `;
}

export function renderTabs() {
  document.getElementById('tabs').innerHTML = `
    <button onclick="setTab(0)" id="tab0" class="tab-active flex-1 py-4">Setup</button>
    <button onclick="setTab(1)" id="tab1" class="flex-1 py-4">Players</button>
    <button onclick="setTab(2)" id="tab2" class="flex-1 py-4">Predictions</button>
    <button onclick="setTab(3)" id="tab3" class="flex-1 py-4">Results</button>
    <button onclick="setTab(4)" id="tab4" class="flex-1 py-4">Leaderboard</button>
  `;
}

export function renderMatches() {
  const container = document.getElementById('panel0');

  const currentName = document.getElementById('eventName')?.value || "";

  container.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">Event Name</h2>
    <input id="eventName" type="text" placeholder="Enter Event Name..."
           value="${currentName}"
           oninput="updateEventName()"
           class="w-full bg-gray-800 border border-gray-600 rounded-2xl px-4 py-3 text-xl mb-8">

    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Matches</h2>
      <button onclick="addMatch()" class="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-2xl font-medium">
        <i class="fas fa-plus"></i> Add Match
      </button>
    </div>
    <div id="matchesList" class="space-y-6"></div>
  `;

  const list = document.getElementById('matchesList');
  if (matches.length === 0) {
    list.innerHTML = `<p class="text-center py-16 text-gray-400">No matches yet. Click "Add Match" to start.</p>`;
    return;
  }

  list.innerHTML = matches.map(m => `
    <div class="match-card bg-gray-800 rounded-3xl p-6">
      <div class="flex justify-between mb-4">
        <input value="${m.title}" oninput="updateMatchTitle(${m.id}, this.value)" class="flex-1 bg-transparent text-xl font-bold focus:outline-none">
        <button onclick="deleteMatch(${m.id})" class="text-red-400"><i class="fas fa-trash"></i></button>
      </div>
      <div class="flex flex-wrap gap-3">
        ${m.participants.map((p, i) => `
          <div class="flex items-center bg-gray-700 rounded-2xl px-4 py-2">
            <input value="${p}" oninput="updateParticipant(${m.id}, ${i}, this.value)" class="bg-transparent w-56 focus:outline-none">
            <button onclick="removeParticipant(${m.id}, ${i})" class="ml-3 text-gray-400 hover:text-red-400"><i class="fas fa-times"></i></button>
          </div>
        `).join('')}
        <button onclick="addParticipant(${m.id})" class="text-yellow-400 flex items-center gap-1 text-sm">
          <i class="fas fa-plus"></i> Add Option
        </button>
      </div>
    </div>
  `).join('');
}

export function renderPlayers() {
  const container = document.getElementById('panel1');
  container.innerHTML = `
    <h2 class="text-2xl font-bold mb-6">Players (max 5)</h2>
    <div id="playersList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"></div>
    <button onclick="addPlayer()" class="mt-8 mx-auto block bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-2xl flex items-center gap-3">
      <i class="fas fa-user-plus"></i> Add Player
    </button>
  `;

  const list = document.getElementById('playersList');
  if (players.length === 0) {
    list.innerHTML = `<div class="col-span-full text-center py-16 text-gray-400"><i class="fas fa-users text-5xl mb-4"></i><p>No players yet</p></div>`;
    return;
  }

  list.innerHTML = players.map(p => `
    <div class="bg-gray-800 rounded-3xl p-6 text-center">
      <input value="${p.name}" oninput="updatePlayerName(${p.id}, this.value)"
             class="bg-transparent text-center text-2xl font-bold w-full focus:outline-none border-b border-transparent focus:border-yellow-400">
      <button onclick="deletePlayer(${p.id})" class="mt-6 text-red-400 text-sm hover:text-red-500">Remove</button>
    </div>
  `).join('');
}

export function renderPredictions() {
  const container = document.getElementById('panel2');
  if (players.length === 0) {
    container.innerHTML = `<p class="text-center py-16 text-gray-400">Add players first in the Players tab.</p>`;
    return;
  }
  if (matches.length === 0) {
    container.innerHTML = `<p class="text-center py-16 text-gray-400">Add matches first in the Setup tab.</p>`;
    return;
  }

  let html = '';
  players.forEach(player => {
    html += `
      <div class="mb-12">
        <div class="flex items-center gap-4 mb-6">
          <div class="text-3xl font-bold">${player.name}</div>
          <button onclick="randomizePlayerPicks(${player.id})" class="text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-2xl">
            🎲 Randomize
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${matches.map(match => {
            const picked = player.picks[match.id];
            return `
              <div class="bg-gray-800 rounded-3xl p-6">
                <div class="font-medium text-yellow-400 mb-4">${match.title}</div>
                <div class="flex flex-wrap gap-3">
                  ${match.participants.map(opt => `
                    <button onclick="makePick(${player.id}, ${match.id}, '${opt.replace(/'/g, "\\'")}')"
                            class="flex-1 px-5 py-4 rounded-2xl text-left ${picked === opt ? 'bg-yellow-400 text-black' : 'bg-gray-700 hover:bg-gray-600'}">
                      ${opt}
                    </button>
                  `).join('')}
                </div>
              </div>`;
          }).join('')}
        </div>
      </div>`;
  });
  container.innerHTML = html;
}

export function renderResults() {
  const container = document.getElementById('panel3');
  let html = `<h2 class="text-2xl font-bold mb-6">Enter Real Winners</h2>`;

  matches.forEach(m => {
    html += `
      <div class="bg-gray-800 rounded-3xl p-6 mb-6">
        <div class="font-bold mb-4">${m.title}</div>
        <div class="flex flex-wrap gap-3">
          ${m.participants.map(opt => `
            <button onclick="setActualWinner(${m.id}, '${opt.replace(/'/g, "\\'")}')"
                    class="flex-1 px-6 py-4 rounded-2xl ${m.actualWinner === opt ? 'bg-yellow-400 text-black' : 'bg-gray-700 hover:bg-gray-600'}">
              ${opt}
            </button>
          `).join('')}
        </div>
      </div>`;
  });
  container.innerHTML = html;
}

export function calculateScores() {
  const container = document.getElementById('panel4');
  const scoredMatches = matches.filter(m => m.actualWinner);
  const total = matches.length;
  const eventName = document.getElementById('eventName')?.value.trim() || "event";

  let html = `
    <h2 class="text-3xl font-bold mb-8 flex justify-between">
      Leaderboard
      <span class="text-yellow-400 text-lg font-normal">${scoredMatches.length}/${total} scored</span>
    </h2>`;

  const standings = players.map(player => {
    let correct = matches.filter(m => m.actualWinner && player.picks[m.id] === m.actualWinner).length;
    return {
      name: player.name,
      correct,
      percentage: total > 0 ? Math.round((correct / total) * 100) : 0
    };
  }).sort((a, b) => b.correct - a.correct);

  standings.forEach((s, i) => {
    html += `
      <div class="flex items-center justify-between bg-gray-800 rounded-2xl px-6 py-5 mb-3">
        <div class="flex items-center gap-4">
          <span class="text-2xl font-bold text-yellow-400 w-8">${i+1}</span>
          <span class="text-xl">${s.name}</span>
        </div>
        <div class="text-right">
          <div class="text-3xl font-bold">${s.correct}</div>
          <div class="text-xs text-gray-400">${s.percentage}% correct</div>
        </div>
      </div>`;
  });

  if (scoredMatches.length === total && total > 0) {
    const champ = standings[0];
    html += `
      <div class="mt-12 text-center py-12 bg-gradient-to-b from-yellow-900/30 to-transparent rounded-3xl border border-yellow-400">
        <div class="text-6xl mb-4">🏆</div>
        <div class="text-5xl font-black text-yellow-400 mb-2">${champ.name}</div>
        <div class="text-2xl">is the <span class="text-yellow-400">${eventName}</span> Champion!</div>
        <div class="mt-6 text-xl">${champ.correct}/${total} correct • ${champ.percentage}%</div>
      </div>`;
    launchConfetti();
  }

  container.innerHTML = html;
}

function launchConfetti() {
  for (let i = 0; i < 100; i++) {
    setTimeout(() => console.log("%c🎉", "font-size:35px;color:#f59e0b"), i * 5);
  }
}
