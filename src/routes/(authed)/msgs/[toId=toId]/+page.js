export const ssr = false;

import localforage from "localforage";
export async function load({ url, locals, params, parent }) {
	console.log({ url, locals, params })

	const { user } = await parent()

	console.log(user, params.toId)
	const name = `DB${user.id}`;
	const channelsDB = localforage.createInstance({
		name,
		storeName: "channels",
		description: "messages form channels",
	});

	const toUser = await channelsDB.getItem(params.toId)
	console.log({ toUser })
	return { toUser }

}
