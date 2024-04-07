import { redirect } from '@sveltejs/kit';

export function load({ url, locals }) {
	if (!locals.user) {
		throw redirect(303, `/login?redirectTo=${url.pathname}`);
	}

	return {
		user: locals.user
	}
}
