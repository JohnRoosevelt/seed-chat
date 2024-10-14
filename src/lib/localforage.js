import localforage from 'localforage';

localforage.config({
    driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE, localforage.WEBSQL],
    name: 'seed_bibleApp',
});

export const storeBibleData = async (data) => {
    await localforage.setItem('bibleData', data);
};

export const getBibleData = async () => {
    return await localforage.getItem('bibleData');
};

export const isBibleDataStored = async () => {
    const data = await getBibleData();
    return data !== null;
};

export async function fetchBibleData() {
    const R2 = 'https://pub-42fa17a0d06841f295980294e061513c.r2.dev'
    const response = await fetch(`${R2}/bible/index.json`);
    if (!response.ok) {
        throw new Error("Failed to fetch Bible data");
    }
    const indexData = await response.json();
    console.log({ indexData })

    const executing = new Set()

    for (const book of indexData) {
        const promise = fetch(`${R2}/bible/${book.id}.json`).then(async result => {
            book.chapters = await result.json()
            executing.delete(promise);
        });

        executing.add(promise);

        if (executing.size >= 6) {
            await Promise.race(executing);
        }
    }

    await Promise.all(executing);
    console.log({ indexData })

    return JSON.parse(JSON.stringify(indexData))
}