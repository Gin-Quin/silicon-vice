import type { AppState, Location, ActorEventData, ActorName } from "./types";

function getAvailableLocations(appState: AppState): Location[] {
	// Count actors per location
	const locationCounts = Object.values(appState.actors).reduce(
		(acc, actor) => {
			acc[actor.location] = (acc[actor.location] || 0) + 1;
			return acc;
		},
		{} as Record<Location, number>,
	);

	// Return locations with 0 or 1 actor
	return Object.entries(locationCounts)
		.filter(([_, count]) => count <= 1)
		.map(([location]) => location as Location);
}

export function getResponseSchema(appState: AppState, actor: ActorName) {
	const actorState = appState.actors[actor];
	const actorLocation = actorState.location;
	const actorsAtSameLocation: ActorName[] = [];

	for (const [name, state] of Object.entries(appState.actors)) {
		if (name !== actor && state.location === actorLocation) {
			actorsAtSameLocation.push(name as ActorName);
		}
	}

	const availableLocations = getAvailableLocations(appState);
	const actors = [
		"Sammixixix",
		"Maximus",
		"Pyro",
		"Flashy Flo",
		"Gauviniño",
		"Jaaguar",
		"DJ Simon",
		"Christine",
		"Cindy",
		"Fat Boy",
	] as const;

	return {
		type: "object",
		additionalProperties: false,
		required: ["action"],
		properties: {
			action: {
				type: "object",
				additionalProperties: false,
				anyOf: [
					{
						// Move action
						properties: {
							type: { type: "string", const: "move" },
							location: {
								type: "string",
								enum: availableLocations,
								description: "The location where the actor should move to",
							},
						},
						required: ["type", "location"],
						additionalProperties: false,
					},
					{
						// Say action
						properties: {
							type: { type: "string", const: "say" },
							message: {
								type: "string",
								description: "The message to say",
							},
							to: {
								type: "string",
								enum: actorsAtSameLocation,
								description: "The actor to whom the message is addressed",
							},
						},
						required: ["type", "message", "to"],
						additionalProperties: false,
					},
					{
						// Kiss action
						properties: {
							type: { type: "string", const: "kiss" },
							with: {
								type: "string",
								enum: actors,
								description: "The actor to kiss",
							},
						},
						required: ["type", "with"],
						additionalProperties: false,
					},
					{
						// Simple actions (sleep, idle, eat, drink, dance)
						properties: {
							type: {
								type: "string",
								enum: ["sleep", "idle", "eat", "drink", "dance"],
							},
						},
						required: ["type"],
						additionalProperties: false,
					},
				],
			},
		},
	};
}
