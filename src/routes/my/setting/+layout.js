export async function load({ data, fetch, params, parent, route, url }) {
	// console.log({ data, fetch, params, parent, route, url })
  const { getDB } = await parent()
	const settingDB = getDB("setting");
	const fontSize = await settingDB.getItem("fontSize") || 4;
	const decorationColor = await settingDB.getItem("decorationColor") || 'red';
	console.log({fontSize, decorationColor})
	return { settingDB, fontSize, decorationColor }
}

export const ssr = false