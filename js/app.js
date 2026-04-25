import { renderHeader, renderTabs } from './render.js';
import * as Handlers from './handlers.js';
import * as Storage from './storage.js';

Object.assign(window, Handlers);
Object.assign(window, Storage);

window.setTab = Handlers.setTab;

// Initialize the app
function init() {
  renderHeader();
  renderTabs();
  Storage.loadFromLocalStorage();
  setTab(0);
  Storage.enableAutoSave();

}

window.onload = init;
