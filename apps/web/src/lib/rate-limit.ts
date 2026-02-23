// Rate limiting stub — wire up a real implementation when needed
export async function checkRateLimit(_request: Request): Promise<{ success: boolean; limited: boolean }> {
	return { success: true, limited: false };
}
