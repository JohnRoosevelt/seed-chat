import localforage from "localforage";
import { env } from '$env/dynamic/public';
import { message } from "sveltekit-superforms";
// TODO:: pnpm i -D sort-by match-sorter

export const initData = $state({
	datas: {},
	user: null,
	socket: null,
	DBName: null,
	channelsDB: null,
	channels: [],
	channelMap: {}
})

export function initSocket(jwt) {
	console.log('init socket', env)
	initData.socket = {}
}

const demoData = [{
	id: "1000002",
	name: "test2",
	createdAt: Date.now(),
	updatedAt: Date.now(),
	msg: "latest message",
	isGroup: false,
}, {
	id: "1000003",
	name: "test3",
	createdAt: Date.now(),
	updatedAt: Date.now(),
	msg: "latest message",
	isGroup: false,
}, {
	id: "1000004",
	name: "test4",
	createdAt: Date.now(),
	updatedAt: Date.now(),
	msg: "latest message",
	isGroup: false,
}, {
	id: "1000005",
	name: "test5",
	createdAt: Date.now(),
	updatedAt: Date.now(),
	msg: "latest message",
	isGroup: false,
}]

export async function initDB() {
	console.log('init db')
	initData.DBName = `DB${initData.user.id}`;
	initData.channelsDB = localforage.createInstance({
		name: initData.DBName,
		storeName: "channels",
		description: "messages form channels",
	});

	const len = await initData.channelsDB.length()

	if (!len) {
		console.log('init chat channels ......')
		await Promise.all(demoData.map(i => initData.channelsDB.setItem(i.id, i)))
	}
}

export async function initChannelHistory(id) {
	if (!initData.channelMap[id]) {
		const db = localforage.createInstance({
			name: initData.DBName,
			storeName: `messages${id}`,
			description: `messages history with ${id}`,
		})

		let messages = []

		async function sendMessage(msg) {
			await db.setItem(msg.id, msg)
			initData.channelMap[id].messages.push(msg)
		}

		async function loadMessage() {
			await db.iterate((v, k, n) => { messages.push(v) })
			messages = messages.sort((a, b) => a.updatedAt - b.updatedAt)
		}

		async function clear() {
			initData.channelMap[id].messages = []
			await db.clear()
		}

		await loadMessage()

		console.log({ messages })
		initData.channelMap[id] = {
			messages,
			sendMessage,
			clear,
		}
	}
	return initData.channelMap[id]
}

export async function initChannels() {
	initData.channels = []
	// await channelsDB.iterate((v, k, n) => { if(!v.hidden) initData.channels.push(v) });
	await initData.channelsDB.iterate((v, k, n) => { initData.channels.push(v) });
	initData.channels = initData.channels.sort((a, b) => b.updatedAt - a.updatedAt)
}

export async function setChannel(id, val) {
	await initData.channelsDB.setItem(id, val);
	const channelIndex = initData.channels.findIndex(i => i.id === id)
	initData.channels.splice(channelIndex, 1)
	initData.channels.unshift(val)
}


export async function init(config) {
	initData.user = config.user
	if (!initData.socket) {
		initSocket()
	}

	if (!initData.channelsDB) {
		await initDB()
	}

	if (initData.channels.length === 0) {
		await initChannels()
	}

}

