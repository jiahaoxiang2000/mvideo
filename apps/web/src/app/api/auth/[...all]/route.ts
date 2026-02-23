// Auth route stub — wire up real auth when needed
export const dynamic = "force-static";
export const revalidate = false;

export function generateStaticParams() {
	return [{ all: ["stub"] }];
}

export async function GET() {
	return new Response("Not implemented", { status: 501 });
}

export async function POST() {
	return new Response("Not implemented", { status: 501 });
}
