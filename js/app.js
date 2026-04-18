// js/app.js
import './data.js';
import { renderHeader, renderTabs, renderMatches, renderPlayers } from './render.js';
import { setTab, newEvent, exportEvent, showImportModal, hideImportModal, importEvent } from './handlers.js';
import { loadFromLocalStorage, enableAutoSave } from './storage.js';

// Make global functions available for inline onclick handlers
window.setTab = setTab;
window.newEvent = newEvent;
window.exportEvent = exportEvent;
window.showImportModal = showImportModal;
window.hideImportModal = hideImportModal;
window.importEvent = importEvent;

// Add other handlers
window.addMatch = () => import('./handlers.js').then(m => m.addMatch());
window.deleteMatch = (id) => import('./handlers.js').then(m => m.deleteMatch(id));
window.updateMatchTitle = (id, title) => import('./handlers.js').then(m => m.updateMatchTitle(id, title));
window.addParticipant = (id) => import('./handlers.js').then(m => m.addParticipant(id));
window.updateParticipant = (id, idx, val) => import('./handlers.js').then(m => m.updateParticipant(id, idx, val));
window.removeParticipant = (id, idx) => import('./handlers.js').then(m => m.removeParticipant(id, idx));
window.addPlayer = () => import('./handlers.js').then(m => m.addPlayer());
window.deletePlayer = (id) => import('./handlers.js').then(m => m.deletePlayer(id));
window.updatePlayerName = (id, name) => import('./handlers.js').then(m => m.updatePlayerName(id, name));
window.updateEventName = () => import('./handlers.js').then(m => m.updateEventName());

// Initialize App
function init() {
  renderHeader();
  renderTabs();
  loadFromLocalStorage();
  setTab(0);
  enableAutoSave();
}

window.onload = init;
