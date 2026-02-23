import { notFound } from "next/navigation";

type PageProps = {
	params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params: _ }: PageProps) {
	return notFound();
}
