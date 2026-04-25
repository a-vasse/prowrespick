// js/data.js
export let matches = [];
export let players = [];
export let eventName = "";

// Use a single object for mutable state
export const state = {
  eventType: "mania"          // "mania" or "rumble"
};

// Royal Rumble specific data
export let rumbleData = {
  mensWinner: null,
  womensWinner: null,
  mensFinal5: [],
  womensFinal5: [],
  mensSurprises: [],
  womensSurprises: []
};

export function resetAllData() {
  matches = [];
  players = [];
  eventName = "";
  state.eventType = "mania";

  rumbleData = {
    mensWinner: null,
    womensWinner: null,
    mensFinal5: [],
    womensFinal5: [],
    mensSurprises: [],
    womensSurprises: []
  };
}
