import { renderHeader, renderTabs } from './render.js';
import { setTab } from './handlers.js';
import { loadFromLocalStorage, enableAutoSave, newEvent, exportEvent, showImportModal, hideImportModal, importEvent } from './storage.js';

window.setTab = setTab;
window.newEvent = newEvent;
window.exportEvent = exportEvent;
window.showImportModal = showImportModal;
window.hideImportModal = hideImportModal;
window.importEvent = importEvent;

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
window.makePick = (playerId, matchId, winner) => import('./handlers.js').then(m => m.makePick(playerId, matchId, winner));
window.randomizePlayerPicks = (playerId) => import('./handlers.js').then(m => m.randomizePlayerPicks(playerId));
window.setActualWinner = (matchId, winner) => import('./handlers.js').then(m => m.setActualWinner(matchId, winner));

function init() {
  renderHeader();
  renderTabs();
  loadFromLocalStorage();
  setTab(0);
  enableAutoSave();

  console.log("%c✅ Fully Modular Pick 'Em App is Ready! 🚀", "color:#f59e0b; font-size:16px");
}

window.onload = init;
