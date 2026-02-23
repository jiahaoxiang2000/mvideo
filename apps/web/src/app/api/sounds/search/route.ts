// Sounds search stub — wire up a real implementation when needed
import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({ results: [], count: 0, next: null, previous: null });
}
