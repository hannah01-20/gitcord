import { pingEvent } from "./ping-event.js";
import { gitcordEvent } from "./gitcord-event.js";
export default async function eventsHandler() {
  // await pingEvent();
  await gitcordEvent();
}