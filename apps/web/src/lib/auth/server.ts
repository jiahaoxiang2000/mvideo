// Auth stub — wire up a real implementation when needed
export const auth = {
	handler: async (_req: Request) => new Response("Not implemented", { status: 501 }),
};

export type Auth = typeof auth;
