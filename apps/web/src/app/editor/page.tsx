"use client";

import { useEffect, useState } from "react";
import { EditorPageClient } from "./[project_id]/editor-page-client";

export default function EditorPage() {
	const [projectId, setProjectId] = useState("local");

	useEffect(() => {
		const value = new URLSearchParams(window.location.search).get("project_id");
		if (value) {
			setProjectId(value);
		}
	}, []);

	return <EditorPageClient projectId={projectId} />;
}
