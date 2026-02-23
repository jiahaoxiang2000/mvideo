import { EditorPageClient } from "./editor-page-client";

export function generateStaticParams() {
	return [{ project_id: "local" }];
}

export default async function EditorPage({
	params,
}: {
	params: Promise<{ project_id: string }>;
}) {
	const { project_id } = await params;
	return <EditorPageClient projectId={project_id} />;
}
