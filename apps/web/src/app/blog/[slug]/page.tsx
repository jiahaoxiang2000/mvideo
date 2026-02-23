import { notFound } from "next/navigation";

type PageProps = {
	params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
	return [{ slug: "placeholder" }];
}

export default async function BlogPostPage({ params: _ }: PageProps) {
	return notFound();
}
