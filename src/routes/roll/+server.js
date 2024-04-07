import { json } from '@sveltejs/kit';

export async function GET({ platform, url }) {
	try {
 		const { test } = platform.env
		const resp = await test.get(test.idFromName('test')).fetch(url)
		return json(await resp.json())

	} catch (error) {
		console.error(error)
		return json()
	}
}
