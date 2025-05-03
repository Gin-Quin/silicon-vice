export type AppState = {
	lastEventId: number;
	commands: Array<Command>;
	news: Array<News>;
	actors: Record<ActorName, ActorState>;
};

export type Actor = {
	name: ActorName;
	description: string;
	image: string;
};

export type Command = {
	id: number;
	created_at: number;
	actor: ActorName;
	command: string;
};

export type ActorName =
	| "Sammixixix"
	| "Maximus"
	| "Pyro"
	| "Flashy Flo"
	| "Gauviniño"
	| "Jaaguar"
	| "Pyro"
	| "DJ Simon"
	| "Christine"
	| "Cindy"
	| "Fat Boy";

export type News = {
	id: number;
	created_at: number;
	actors: Array<ActorName>;
	description: string;
	start_at: number;
	end_at: number;
};

export type Location =
	| "nid_de_la_séduction"
	| "havre_des_désirs"
	| "restaurant_de_la_belle_vie"
	| "chambre_des_confidences"
	| "plage_des_interdits"
	| "grotte_des_secrets"
	| "bassin_des_émois"
	| "verger_des_promesses";

export type ActorState = {
	location: Location;
	objectives: Array<string>;
	activity: Activity;
};

export type ActorEvent = {
	id: number;
	created_at: number;
	actor: ActorName;
	activity: Activity;
};

export type Activity = ActorEventData & { duration: number };

export type ActorEventData =
	| { type: "move"; location: Location }
	| { type: "say"; message: string; to: ActorName }
	| { type: "kiss"; with: ActorName }
	| { type: "sleep" }
	| { type: "idle" }
	| { type: "eat" }
	| { type: "drink" }
	| { type: "dance" };

export type ActivityType = ActorEventData["type"];

export const getActivityDescription = (activity: Activity) => {
	switch (activity.type) {
		case "move":
			return `te déplacer vers ${activity.location}`;
		case "say":
			return `parler à ${activity.to} : ${activity.message}`;
		case "kiss":
			return `embrasser ${activity.with}`;
		case "sleep":
			return "dormir";
		case "idle":
			return "ne rien faire";
		case "eat":
			return "manger";
		case "drink":
			return "boire";
		case "dance":
			return "danser";
	}
};
