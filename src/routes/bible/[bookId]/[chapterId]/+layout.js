import { redirect } from '@sveltejs/kit';
import { fetchBibleBookData } from '$lib/datas/bible';
import localforage from 'localforage';

export const ssr = false


export async function load({ parent, params: { bookId, chapterId } }) {
  const { books} = await parent()  
  const book = books.find(i => i.id == bookId)

  const preBookId = bookId == 1 ? bookId : Number(bookId) - 1
  const nextBookId = bookId == books.length ? bookId : Number(bookId) + 1

  try {
    localforage.config({
      driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE, localforage.WEBSQL],
      name: 'seed_bibleApp',
    });

    let storedBook = await localforage.getItem(bookId);
    if (!storedBook) {
      storedBook = await fetchBibleBookData(bookId)
      await localforage.setItem(bookId, storedBook);
    }
    book.chapters = storedBook
  } catch (error) {
    console.error(error);
    book.chapters = []
  }



  if (chapterId <= 0) {
    throw redirect(303, `/bible/${preBookId}/1`);
  }

  if (chapterId > book.chapters.length) {
    throw redirect(303, `/bible/${nextBookId}/${bookId == books.length ? chapterId : 1}`);
  }


  const chapter = book.chapters.find(i => i.id == chapterId)
  console.log( { bookId, chapterId, book, chapter })

  return { book, chapter }
}
