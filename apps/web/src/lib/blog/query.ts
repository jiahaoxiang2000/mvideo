// Blog stub — not used in mvideo editor core
export async function getPosts() {
	return { posts: [] as Array<{ slug: string }> };
}

export async function getTags() {
	return { tags: [] };
}

export async function getSinglePost(
	_args: { slug: string },
): Promise<{ post: null } | null> {
	return null;
}

export async function getCategories() {
	return { categories: [] };
}

export async function getAuthors() {
	return { authors: [] };
}

export async function processHtmlContent({ html }: { html: string }): Promise<string> {
	return html;
}
