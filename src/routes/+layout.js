import { getDB } from '$lib/datas/bible';

export async function load({ data, fetch, params, parent, route, url }) {
	console.log({ data, fetch, params, parent, route, url })
	const isStandalone = window.matchMedia('(display-mode: standalone)').matches
  const isMobile = !!window.navigator.userAgent.match(/AppleWebKit.*Mobile.*/)
	return { getDB, isStandalone, isMobile }
}

export const ssr = false