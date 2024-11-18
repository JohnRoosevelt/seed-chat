import { getDB } from '$lib/datas/bible';

export async function load({ data, fetch, params, parent, route, url }) {
	console.log({ data, fetch, params, parent, route, url })
	const isStandalone = window.matchMedia('(display-mode: standalone)').matches
  const isMobile = !!window.navigator.userAgent.match(/AppleWebKit.*Mobile.*/)
	const isWindows = /Windows/.test(window.navigator.userAgent)
	const isAndroid = /Android/.test(window.navigator.userAgent)
	const isMac = /Macintosh|Mac OS X/.test(window.navigator.userAgent)
	return { getDB, isStandalone, isMobile, isMac, isWindows, isAndroid }
}

export const ssr = false