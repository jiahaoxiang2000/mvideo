import { SITE_URL } from "@/constants/site-constants";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	return [
		{
			url: SITE_URL,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${SITE_URL}/projects`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.9,
		},
	];
}
