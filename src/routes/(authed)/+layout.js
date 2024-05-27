import { init, initData } from './data.svelte.js';

export async function load({ data }) {
	if (!initData.user)
		await init(data)
	return data
}

export const ssr = false