import { fetchBibleIndexData, getDB } from '$lib/datas/bible';

export const ssr = false


export async function load() {

  let bible = []

  try {
    const bibleDB = getDB('bible');

    let storedIndex = await bibleDB.getItem('index');
    if (!storedIndex) {
      storedIndex = await fetchBibleIndexData()
      await bibleDB.setItem('index', storedIndex);
    }
    bible = storedIndex
  } catch (error) {
    console.error(error);
  }

  console.log({ bible })

  return { bible }
}
