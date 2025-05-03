import { actors, globalDescription, globalDirectives } from "./actors";
import { env } from "./env";
import { startAgent } from "./startAgent";
import { appState } from "./state";
import { pool } from "./supabase";
import { getActivityDescription } from "./types";
import { applyEvent } from "./updateState";
import OpenAI from "openai";

/**
 * Starts the server, gives objectives to all characters.
 */
export async function startServer() {
	const client = await pool.connect();

	const { rows: actorEvents } = await client.query(
		"SELECT * FROM events ORDER BY created_at ASC",
	);

	for (const actorEvent of actorEvents) {
		applyEvent(appState, actorEvent);
	}
	// insert one actor event
	// await client.query(
	// 	'INSERT INTO events (actor, activity) VALUES (\'Maximus\', \'{"type": "say", "message": "Hello, world!", "to": "Fat Boy"}\')',
	// );

	console.log("App ready!", appState);

	for (const actor of actors) {
		startAgent(actor);
	}
}
