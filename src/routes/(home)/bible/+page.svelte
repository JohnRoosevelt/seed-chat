<script>
  import {
    storeBibleData,
    getBibleData,
    isBibleDataStored,
    fetchBibleData,
  } from "$lib/localforage";
  import { initData } from "$lib/data.svelte";


  let books = $state([]);
  let message = $state("");

  async function loadBibleData() {
    const stored = await isBibleDataStored();

    if (stored) {
      try {
        books = await getBibleData();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        message = "正在下载数据";
        books = await fetchBibleData()
      } catch (error) {
        console.error(error);
        message = "下载数据出错";
      }

      try {
        message = '正在初始化数据'
        await storeBibleData($state.snapshot(books));
      } catch (error) {
        console.error(error)
        message = "初始化数据出错";
      }
    }

    initData.datas.bible = $state.snapshot(books)
  }

  $effect.pre(() => {
    try {
      loadBibleData();
    } catch (error) {
      console.error(error);
    }
  });
</script>

{#if books.length}
  <div w-full grid grid-cols-6 gap-px>
    {#each books as book}
      <a
        href="/bibles/{book.id}/"
        flex-cc
        h-12
        relative
        class="bg-{book.title == '旧约' ? 'blue' : 'green'}"
      >
        <div
          absolute
          w-full
          top-0
          px-1
          py-px
          flex-bc
          text-7px
          text-red
          font-700
        >
          <span>{book.id}</span>
          <span>{book.name.en}</span>
        </div>

        <p text-7>{book.name.ZH}</p>

        <div
          absolute
          w-full
          bottom-0
          px-1
          py-px
          flex-bc
          text-7px
          text-red
          font-700
        >
          <span>{book.name.zh}</span>
          <span>{book.chapters.length}</span>
        </div>
      </a>
    {/each}
  </div>
{:else}
  <p>{message}</p>
{/if}
