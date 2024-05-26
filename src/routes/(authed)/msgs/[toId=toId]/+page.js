
export async function load({ params, parent }) {

	const { user, channelsDB, localforage } = await parent()

	const name = `DB${user.id}`;

	const msgsDB = localforage.createInstance({
		name,
		storeName: `messages${params.toId}`,
		description: `messages form ${params.toId}`,
	});

	const messages = []
	const [toUser] = await Promise.all([
		channelsDB.getItem(params.toId),
		msgsDB.iterate((v, k, n) => { messages.push(v) })
	])

	console.log({ toUser, messages })
	return { toUser, messages, msgsDB }
}

// export const ssr = false;

