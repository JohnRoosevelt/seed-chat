import { fetchBibleIndexData } from '$lib/datas/bible';
import localforage from 'localforage';

export const ssr = false


export async function load() {

  let books = []

  try {

    localforage.config({
      driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE, localforage.WEBSQL],
      name: 'seed_bibleApp',
    });

    let storedIndex = await localforage.getItem('index');
    if (!storedIndex) {
      storedIndex = await fetchBibleIndexData()
      await localforage.setItem('index', storedIndex);
    }
    books = storedIndex
  } catch (error) {
    console.error(error);
  }

  return { books }
}
