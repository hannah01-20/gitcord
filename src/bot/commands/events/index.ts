import { gitcordEvent } from "./gitcord-event.js";
export default async function eventsHandler() {
  await gitcordEvent();
}