import { fetchBibleIndexData } from '$lib/datas/bible';
import localforage from 'localforage';

export const ssr = false


export async function load() {

  let bible = []

  try {
    localforage.config({
      driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE, localforage.WEBSQL],
    });

    const bibleDB = localforage.createInstance({
      name: 'seed',
      storeName: 'bible'
    });

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
