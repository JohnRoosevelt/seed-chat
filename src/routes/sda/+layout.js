import { fetchSdaIndexData } from '$lib/datas/bible';

export const ssr = false


export async function load({ parent }) {
  const { getDB } = await parent()

  let books = []

  try {
    const sdaDB = getDB('sda')
    let storedIndex = await sdaDB.getItem('index');
    if (!storedIndex) {
      storedIndex = await fetchSdaIndexData()
      await sdaDB.setItem('index', storedIndex);
    }
    books = storedIndex
  } catch (error) {
    console.log(error)
  }
  // console.log({ books })
  return { books }
}
