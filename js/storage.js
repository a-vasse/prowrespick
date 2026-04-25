// js/storage.js
import { matches, players, eventType, rumbleData, resetAllData } from './data.js';

export function saveToLocalStorage() {
  const data = {
    eventName: document.getElementById('eventName')?.value.trim() || "",
    eventType: eventType,
    matches: matches,
    players: players,
    rumbleData: rumbleData
  };
  localStorage.setItem('pickemData', JSON.stringify(data));
}

export function loadFromLocalStorage() {
  const saved = localStorage.getItem('pickemData');
  if (!saved) return;

  try {
    const data = JSON.parse(saved);

    // Restore event name
    const nameInput = document.getElementById('eventName');
    if (nameInput) nameInput.value = data.eventName || "";

    // Restore event type (using the state object)
    if (data.eventType) {
      state.eventType = data.eventType;
    }

    // Restore arrays
    matches.length = 0;
    players.length = 0;
    matches.push(...(data.matches || []));
    players.push(...(data.players || []));

    // Restore Rumble data
    if (data.rumbleData) {
      Object.assign(rumbleData, data.rumbleData);
    }

  } catch (e) {
    console.error("Failed to load saved data:", e);
  }
}

export function enableAutoSave() {
  setInterval(saveToLocalStorage, 2000);
}


export function newEvent() {
  if (!confirm("Start a completely new event?\n\nAll current data will be lost.")) {
    return;
  }

  localStorage.removeItem('pickemData');
  resetAllData();

  const nameInput = document.getElementById('eventName');
  if (nameInput) nameInput.value = "";

  setTab(0);
  alert("🆕 New event started!");
}

export function exportEvent() {
  try {
    saveToLocalStorage();

    const data = {
      eventName: document.getElementById('eventName')?.value.trim() || "Untitled Event",
      eventType: eventType,
      matches: matches,
      players: players,
      rumbleData: rumbleData
    };

    const encoded = btoa(JSON.stringify(data));

    navigator.clipboard.writeText(encoded).then(() => {
      alert(`✅ Export Successful!\n\n${data.eventName}\nMode: ${data.eventType === 'rumble' ? 'Royal Rumble' : 'WrestleMania'}\n\nCode copied to clipboard.`);
    });

  } catch (error) {
    console.error("Export failed:", error);
    alert("❌ Failed to export event. Check console for details.");
  }
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
  if (!code) return alert("Please paste a code first.");

  try {
    const data = JSON.parse(atob(code));

    const nameInput = document.getElementById('eventName');
    if (nameInput) nameInput.value = data.eventName || "";

    if (data.eventType) {
      eventType = data.eventType;
    }

    matches.length = 0;
    players.length = 0;
    matches.push(...(data.matches || []));
    players.push(...(data.players || []));

    if (data.rumbleData) {
      Object.assign(rumbleData, data.rumbleData);
    }

    hideImportModal();
    saveToLocalStorage();
    setTab(0);

    alert(`✅ Successfully imported "${data.eventName || 'Event'}"!`);

  } catch (e) {
    console.error(e);
    alert("❌ Invalid code. Please make sure you copied the full export code.");
  }
}
