import { browser } from '$app/environment';

let dayjs = null;

if (browser) {
  (async () => {
    dayjs = (await import('dayjs')).default;
    dayjs.extend((await import('dayjs/plugin/localizedFormat')).default);
    dayjs.locale((await import('dayjs/locale/zh-cn')).default);
  })()
}

export function formatDate(date = Date.now()) {
  if (dayjs) {
    return dayjs(date).format('L LTS');
  } else {
    return date;
  }
}