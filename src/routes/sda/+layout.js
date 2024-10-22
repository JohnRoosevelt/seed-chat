import { fetchSdaIndexData } from '$lib/datas/bible';
import localforage from 'localforage';

export const ssr = false


export async function load() {
  let books = []

  try {
    localforage.config({
      driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE, localforage.WEBSQL],
    });

    const sdaDB = localforage.createInstance({
      name: 'seed',
      storeName: 'sda'
    });
    let storedIndex = await sdaDB.getItem('index');
    if (!storedIndex) {
      storedIndex = await fetchSdaIndexData()
      await sdaDB.setItem('index', storedIndex);
    }
    books = storedIndex
  } catch (error) {
    console.log(error)
  }
  console.log({ books })
  return { books }
}
