import { SITE_INFO, SITE_URL } from "@/constants/site-constants";

export async function GET() {
	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE_INFO.title}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_INFO.description}</description>
  </channel>
</rss>`;

	return new Response(rss, {
		headers: {
			"Content-Type": "text/xml",
			"Cache-Control": "public, max-age=86400, stale-while-revalidate",
		},
	});
}
