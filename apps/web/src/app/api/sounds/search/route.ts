// Sounds search stub — wire up a real implementation when needed
import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
	return NextResponse.json({ results: [], count: 0, next: null, previous: null });
}
