import { initData } from '$lib/data.svelte.js';
import { fetchsdaData } from '$lib/datas/bible';
import localforage from 'localforage';

export const ssr = false


export async function load() {
  localforage.config({
    driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE, localforage.WEBSQL],
    name: 'seed_sdaApp',
  });

  if (!initData.datas.sda) {
    const sdaData = await localforage.getItem('sdaData');

    if (sdaData) {
      try {
        initData.datas.sda = sdaData;
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        // message = "正在下载数据";
        const data = await fetchsdaData()
        initData.datas.sda = data
        try {
          // message = '正在初始化数据'
          await localforage.setItem('sdaData', data);
        } catch (error) {
          console.error(error)
          // message = "初始化数据出错";
        }
      } catch (error) {
        console.error(error);
        // message = "下载数据出错";
      }

    }
  }

  return { books: initData.datas.sda }
}
