const R2 = 'https://pub-42fa17a0d06841f295980294e061513c.r2.dev'

export async function fetchBibleIndexData() {
  const response = await fetch(`${R2}/bible/index.json`);
  if (!response.ok) {
      throw new Error("Failed to fetch Bible data");
  }
  const indexData = await response.json();
  console.log({ indexData })
  return indexData
}

export async function fetchBibleBookData(bookId) {
  const response = await fetch(`${R2}/bible/${bookId}.json`);
  if (!response.ok) {
      throw new Error("Failed to fetch Bible data");
  }
  const book = await response.json();
  console.log({ book })
  return book
}

export async function fetchBibleData() {
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

  return indexData
}

export async function fetchsdaData() {
  const response = await fetch(`${R2}/sda/index.json`);
  if (!response.ok) {
      throw new Error("Failed to fetch Bible data");
  }
  const indexData = await response.json();
  console.log({ indexData })

  const executing = new Set()

  for (const book of indexData) {
      const promise = fetch(`${R2}/sda/${book.id}.json`).then(async result => {
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

  return indexData
}