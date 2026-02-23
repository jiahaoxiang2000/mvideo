export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
	return new Response("OK", { status: 200 });
}
