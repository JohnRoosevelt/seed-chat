import { init, initData } from '$lib/data.svelte.js';

export async function load({data, fetch, params, parent, route, url}) {
	console.log({data, fetch, params, parent, route, url})
	// if (!initData.user)
	// 	await init(data)
	return data
}

export const ssr = false