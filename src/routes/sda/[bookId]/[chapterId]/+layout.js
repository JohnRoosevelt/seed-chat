import { redirect } from '@sveltejs/kit';
import { fetchSdaBookData } from '$lib/datas/bible';
import localforage from 'localforage';

export const ssr = false


export async function load({ parent, params: { bookId, chapterId } }) {
  const { books} = await parent()  
  const book = books.find(i => i.id == bookId)
  console.log({book})

  try {

    localforage.config({
      driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE, localforage.WEBSQL],
      name: 'seed_sdaApp',
    });

    let storedBook = await localforage.getItem(bookId);
    if (!storedBook) {
      storedBook = await fetchSdaBookData(bookId)
      await localforage.setItem(bookId, storedBook);
    }
    book.chapters = storedBook

  } catch (error) {
    console.error(error);
    book.chapters = []
  }

  if (chapterId <= 0) {
    throw redirect(303, `/sda/${book.id}/${1}`);
  }

  if (chapterId > book.chapters.length) {
    throw redirect(303, `/sda/${book.id}/${chapterId}`);
  }


  const chapter = book.chapters[Number(chapterId -1)]
  console.log( { bookId, chapterId, book, chapter })

  return { book, chapter }
}
