import { renderHeader, renderTabs } from './render.js';
import { setTab } from './handlers.js';
import * as Storage from './storage.js';

import * as Handlers from './handlers.js';

const allHandlers = { ...Handlers, ...Storage, setTab };
Object.assign(window, allHandlers);

function init() {
  renderHeader();
  renderTabs();
  Storage.loadFromLocalStorage();
  setTab(0);
  Storage.enableAutoSave();
}

window.onload = init;
