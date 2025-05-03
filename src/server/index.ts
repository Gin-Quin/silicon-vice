import { Hono } from "hono";
import { startServer } from "./startServer";

const app = new Hono();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

startServer();

export default app;
