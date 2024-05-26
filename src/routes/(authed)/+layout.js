import localforage from "localforage";

export async function load({ data }) {

	const { user } = data

	const name = `DB${user.id}`;
	const channelsDB = localforage.createInstance({
		name,
		storeName: "channels",
		description: "messages form channels",
	});

	const len = await channelsDB.length()

	if (!len) {
		console.log('init ......')
		await channelsDB.setItem("1000002", {
			id: "1000002",
			name: "test2",
			createdAt: Date.now(),
			updatedAt: Date.now(),
			msg: "latest message2",
			isGroup: false,
		});
		await channelsDB.setItem("1000003", {
			id: "1000003",
			name: "test3",
			createdAt: Date.now(),
			updatedAt: Date.now(),
			msg: "latest message3",
			isGroup: false,
		});
		await channelsDB.setItem("1000004", {
			id: "1000004",
			name: "test4",
			createdAt: Date.now(),
			updatedAt: Date.now(),
			msg: "latest message4",
			isGroup: false,
		});
		await channelsDB.setItem("1000005", {
			id: "1000005",
			name: "test5",
			createdAt: Date.now(),
			updatedAt: Date.now(),
			msg: "latest message5",
			isGroup: false,
		});
	}


	const channels = []
	await channelsDB.iterate((v, k, n) => { channels.push(v) });

	return {
		localforage,
		channelsDB,
		channels,
		user,
		async clearDB() {
			await localforage.dropInstance({ name })
			await fetch('/logout', {
				method: 'POST', headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
			})
			location.href = '/'
		}
	}
}

export const ssr = false;
