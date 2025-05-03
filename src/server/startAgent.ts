import {
	type ActorEvent,
	type ActorName,
	getActivityDescription,
	type Location,
} from "./types";
import { openaiClient } from "./openAIClient";
import type { actors } from "./actors";
import { globalDescription, globalDirectives } from "./actors";
import { appState } from "./state";
import { getResponseSchema } from "./tools";
import { Action } from "svelte/action";

export async function startAgent(actor: (typeof actors)[number]) {
	const responseSchema = getResponseSchema(appState, actor.name);

	console.log("Starting agent", actor.name);

	const action = await openaiClient.responses.create({
		model: "gpt-4o",
		instructions: actor.instructions,
		input: [
			{
				role: "system",
				content: globalDescription,
			},
			{
				role: "system",
				content: globalDirectives,
			},
			{
				role: "developer",
				content: actor.firstMission,
			},
			{
				role: "user",
				content: `[Toi-même] : Tu es actuellement dans la grotte des secrets en train de ${getActivityDescription(appState.actors[actor.name].activity)}, que veux-tu faire ?`,
			},
		],
		text: {
			format: {
				type: "json_schema",
				name: "action",
				schema: responseSchema,
			},
		},
	});

	console.log("Got action for agent", actor.name, action);
}

function getActorsByLocation(): Record<Location, ActorName[]> {
	const actorsByLocation = {} as Record<Location, ActorName[]>;

	for (const actor of Object.keys(appState.actors)) {
		const actorState = appState.actors[actor as ActorName];
		const actorLocation = actorState.location;
		actorsByLocation[actorLocation as Location].push(actor as ActorName);
	}

	return actorsByLocation;
}

function applyRealTimeEvent(actor: ActorName, event: ActorEvent) {
	const actorState = appState.actors[actor];
	const actorLocation = actorState.location;
	const newActivity = event.activity;
	const actorsByLocation = getActorsByLocation();

	switch (newActivity.type) {
		case "move": {
			if (actorsByLocation[newActivity.location].length > 1) {

		}
	}
}
