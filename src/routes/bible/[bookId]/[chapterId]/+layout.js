import { redirect } from '@sveltejs/kit';
import { fetchBibleBookData } from '$lib/datas/bible';
import localforage from 'localforage';

export const ssr = false


export async function load({ parent, params: { bookId, chapterId } }) {
  const { books} = await parent()  
  const book = books.find(i => i.id == bookId)

  const preBook = bookId == 1 ? book : books.find(i => i.id == Number(bookId) - 1)
  const nextBook = bookId == books.length ? book : books.find(i => i.id == Number(bookId) + 1)


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

    let storedPreBook = await localforage.getItem(String(preBook.id));
    if (!storedPreBook) {
      storedPreBook = await fetchBibleBookData(preBook.id)
      await localforage.setItem(String(preBook.id), storedPreBook);
    }
    preBook.chapters = storedPreBook

    let storedNextBook = await localforage.getItem(String(nextBook.id));
    if (!storedNextBook) {
      storedNextBook = await fetchBibleBookData(nextBook.id)
      await localforage.setItem(String(nextBook.id), storedNextBook);
    }
    nextBook.chapters = storedNextBook
  } catch (error) {
    console.error(error);
    book.chapters = []
  }



  if (chapterId == 0) {
    console.log('-')
    let chapterId_;

    if (bookId == 1) {
      chapterId_ = 1;
    } else {
      chapterId_ = preBook.chapters.length;
    }

    throw redirect(303, `/bible/${preBook.id}/${chapterId_}`);
  }

  if (chapterId > book.chapters.length) {
    console.log('+')
    let chapterId_;

    if (bookId == books.length) {
      chapterId_ = book.chapters.length;
    } else {
      chapterId_ = 1;
    }
    throw redirect(303, `/bible/${nextBook.id}/${chapterId_}`);
  }


  const chapter = book.chapters.find(i => i.id == chapterId)
  console.log( { bookId, chapterId, book, chapter })

  return { book, chapter }
}
