import { matches, players, resetAllData } from './data.js';
import { renderMatches, renderPlayers } from './render.js';

export function saveToLocalStorage() {
  const data = {
    eventName: document.getElementById('eventName') ?
               document.getElementById('eventName').value.trim() : "",
    matches: matches,
    players: players
  };
  localStorage.setItem('pickemData', JSON.stringify(data));
}

export function loadFromLocalStorage() {
  const saved = localStorage.getItem('pickemData');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      if (document.getElementById('eventName')) {
        document.getElementById('eventName').value = data.eventName || "";
      }
      // Note: Since matches and players are imported as live references,
      // we need to re-assign them properly
      Object.assign(matches, data.matches || []);
      Object.assign(players, data.players || []);
    } catch (e) {
      console.error("Failed to load saved data", e);
    }
  }
}

export function enableAutoSave() {
  setInterval(saveToLocalStorage, 2000);
}

export function newEvent() {
  if (confirm("Start a completely new event? All progress will be lost.")) {
    localStorage.removeItem('pickemData');
    resetAllData();
    if (document.getElementById('eventName')) {
      document.getElementById('eventName').value = "";
    }
    setTab(0);
  }
}

export function exportEvent() {
  saveToLocalStorage();
  const data = {
    eventName: document.getElementById('eventName').value.trim() || "Untitled Event",
    matches: matches,
    players: players
  };
  const encoded = btoa(JSON.stringify(data));
  navigator.clipboard.writeText(encoded).then(() => {
    alert("✅ Full event exported to clipboard!\n\nSave this code somewhere safe.");
  });
}

export function showImportModal() {
  const modal = document.getElementById('importModal');
  modal.innerHTML = `
    <div class="bg-gray-900 rounded-3xl p-8 w-full max-w-md mx-4">
      <h3 class="text-2xl font-bold mb-4">Import Event</h3>
      <textarea id="importCode" rows="6"
                class="w-full bg-gray-800 border border-gray-600 rounded-2xl p-4 font-mono text-sm"
                placeholder="Paste your exported code here..."></textarea>
      <div class="flex gap-4 mt-6">
        <button onclick="hideImportModal()"
                class="flex-1 py-4 text-gray-400 hover:text-white">Cancel</button>
        <button onclick="importEvent()"
                class="flex-1 py-4 bg-yellow-400 text-black font-bold rounded-2xl">Load Event</button>
      </div>
    </div>
  `;
  modal.classList.remove('hidden');
}

export function hideImportModal() {
  document.getElementById('importModal').classList.add('hidden');
}

export function importEvent() {
  const code = document.getElementById('importCode').value.trim();
  try {
    const data = JSON.parse(atob(code));

    if (document.getElementById('eventName')) {
      document.getElementById('eventName').value = data.eventName || "";
    }

    Object.assign(matches, data.matches || []);
    Object.assign(players, data.players || []);

    hideImportModal();
    saveToLocalStorage();
    setTab(0);
    alert("✅ Event imported successfully!");
  } catch (e) {
    alert("❌ Invalid import code. Please try again.");
  }
}
