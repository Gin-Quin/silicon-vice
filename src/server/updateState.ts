import type { ActorEvent, AppState, Command, News } from "./types";

export function applyEvent(state: AppState, event: ActorEvent): AppState {
	const character = state.actors[event.actor];
	const { activity } = event;
	switch (activity.type) {
		case "move": {
			// todo: check if the location is valid
			character.location = activity.location;
			break;
		}
	}
	character.activity = activity;
	return state;
}

export function applyNews(state: AppState, news: News): AppState {
	state.news.push(news);
	return state;
}

export function applyCommand(state: AppState, command: Command): AppState {
	state.commands.push(command);
	return state;
}
