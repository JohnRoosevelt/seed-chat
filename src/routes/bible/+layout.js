import { initData } from '$lib/data.svelte.js';
import { fetchBibleData, isBibleDataStored, getBibleData, storeBibleData } from '$lib/datas/bible';
import localforage from 'localforage';

export const ssr = false


export async function load() {
  localforage.config({
    driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE, localforage.WEBSQL],
    name: 'seed_bibleApp',
  });

  if (!initData.datas.bible) {
    const stored = await isBibleDataStored(localforage);

    if (stored) {
      try {
        initData.datas.bible = await getBibleData(localforage);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        // message = "正在下载数据";
        initData.datas.bible = await fetchBibleData()
      } catch (error) {
        console.error(error);
        // message = "下载数据出错";
      }

      try {
        // message = '正在初始化数据'
        await storeBibleData(localforage, initData.datas.bible);
      } catch (error) {
        console.error(error)
        // message = "初始化数据出错";
      }
    }
  }

  return { books: initData.datas.bible }
}
