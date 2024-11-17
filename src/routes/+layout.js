import { getDB } from '$lib/datas/bible';

export async function load({ data, fetch, params, parent, route, url }) {
	console.log({ data, fetch, params, parent, route, url })
	return { getDB }
}

export const ssr = false