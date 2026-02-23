import type { Metadata } from "next";
import { SITE_INFO, SITE_URL } from "@/constants/site-constants";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const [repositoryOwner = "", repositoryName = ""] = (
	process.env.GITHUB_REPOSITORY ?? ""
).split("/");
const basePath = isGitHubPages && repositoryName ? `/${repositoryName}` : "";
const metadataBase =
	isGitHubPages && repositoryOwner && repositoryName
		? new URL(`https://${repositoryOwner}.github.io${basePath}`)
		: new URL(SITE_URL);

const withBasePath = (path: string) => `${basePath}${path}`;

export const baseMetaData: Metadata = {
	metadataBase,
	title: SITE_INFO.title,
	description: SITE_INFO.description,
	openGraph: {
		title: SITE_INFO.title,
		description: SITE_INFO.description,
		url: SITE_URL,
		siteName: SITE_INFO.title,
		locale: "en_US",
		type: "website",
		images: [
			{
				url: withBasePath(SITE_INFO.openGraphImage),
				width: 1200,
				height: 630,
				alt: "MVideo Wordmark",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: SITE_INFO.title,
		description: SITE_INFO.description,
		creator: "@mvideoapp",
		images: [withBasePath(SITE_INFO.twitterImage)],
	},
	pinterest: {
		richPin: false,
	},
	robots: {
		index: true,
		follow: true,
	},
	icons: {
		icon: [
			{ url: withBasePath("/favicon.ico") },
			{
				url: withBasePath("/icons/favicon-16x16.png"),
				sizes: "16x16",
				type: "image/png",
			},
			{
				url: withBasePath("/icons/favicon-32x32.png"),
				sizes: "32x32",
				type: "image/png",
			},
			{
				url: withBasePath("/icons/favicon-96x96.png"),
				sizes: "96x96",
				type: "image/png",
			},
		],
		apple: [
			{
				url: withBasePath("/icons/apple-icon-57x57.png"),
				sizes: "57x57",
				type: "image/png",
			},
			{
				url: withBasePath("/icons/apple-icon-60x60.png"),
				sizes: "60x60",
				type: "image/png",
			},
			{
				url: withBasePath("/icons/apple-icon-72x72.png"),
				sizes: "72x72",
				type: "image/png",
			},
			{
				url: withBasePath("/icons/apple-icon-76x76.png"),
				sizes: "76x76",
				type: "image/png",
			},
			{
				url: withBasePath("/icons/apple-icon-114x114.png"),
				sizes: "114x114",
				type: "image/png",
			},
			{
				url: withBasePath("/icons/apple-icon-120x120.png"),
				sizes: "120x120",
				type: "image/png",
			},
			{
				url: withBasePath("/icons/apple-icon-144x144.png"),
				sizes: "144x144",
				type: "image/png",
			},
			{
				url: withBasePath("/icons/apple-icon-152x152.png"),
				sizes: "152x152",
				type: "image/png",
			},
			{
				url: withBasePath("/icons/apple-icon-180x180.png"),
				sizes: "180x180",
				type: "image/png",
			},
		],
		shortcut: [withBasePath("/favicon.ico")],
	},
	appleWebApp: {
		capable: true,
		title: SITE_INFO.title,
	},
	manifest: withBasePath("/manifest.json"),
	other: {
		"msapplication-config": withBasePath("/browserconfig.xml"),
	},
};
