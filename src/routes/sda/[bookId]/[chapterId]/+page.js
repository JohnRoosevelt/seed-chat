import { redirect } from '@sveltejs/kit';
import { fetchSdaBookData } from '$lib/datas/bible';

export const ssr = false


export async function load({ parent, params: { bookId, chapterId } }) {
  const { books, getDB } = await parent()
  const book = books.find(i => i.id == bookId)
  // console.log({book})

  try {
    const sdaDB = getDB('sda');

    let storedBook = await sdaDB.getItem(bookId);
    if (!storedBook) {
      storedBook = await fetchSdaBookData(bookId)
      await sdaDB.setItem(bookId, storedBook);
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
    throw redirect(303, `/sda/${book.id}/${book.chapters.length}`);
  }

  const chapter = book.chapters[Number(chapterId - 1)]
  console.log({ bookId, chapterId, book, chapter })

  const settingDB = getDB("setting")
  const fontSize = await settingDB.getItem("fontSize");
  const decorationColor = await settingDB.getItem("decorationColor");

  const notesDB = getDB('notes')
  const noteKey = `sda_${bookId}_${chapterId}`
  const notes = await notesDB.getItem(noteKey) || {}

  async function setNotes(note) {
    await notesDB.setItem(noteKey, note)
  }

  return { book, chapter, fontSize, decorationColor, setNotes, notes }
}
