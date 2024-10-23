<script>
  import Header from "$com/header.svelte";
  import { page } from "$app/stores";
  import { getDB } from "$lib/datas/bible";
  import Books from "./books.svelte";
  import Chpater from "./chpater.svelte";

  const { data } = $props();

  let fontSize = $state(7);
  let settingDB;
  $effect(async () => {
    if (!settingDB) {
      settingDB = getDB("setting");
    }

    const dbFontSize = await settingDB.getItem("fontSize");
    if (!dbFontSize) {
      await settingDB.setItem("fontSize", fontSize);
      return;
    }
    fontSize = dbFontSize;
  });

  async function onFontSizeChange(isBigger) {
    isBigger
      ? fontSize < 7
        ? fontSize++
        : fontSize
      : fontSize > 4
        ? fontSize--
        : fontSize;
    await settingDB.setItem("fontSize", fontSize);
  }

  console.log(data.chapter)
</script>

<Header back={() => history.back()} color="green">
  <a href="/sda" flex-cc>
    <span i-carbon-chevron-left text-2xl></span>
    <span> 返回 </span>
  </a>

  <div underline underline-offset-8>
    {data.book.name}
  </div>

  <div space-x-2px>
    <button aria-label="-" onclick={() => onFontSizeChange(false)}>
      <span i-ic-outline-text-decrease></span>
    </button>
    <span>{fontSize}</span>
    <button aria-label="+" onclick={() => onFontSizeChange(true)}>
      <span i-ic-outline-text-increase></span>
    </button>
  </div>
</Header>

<article w-full px-5 py-12 space-y-2 class="text-{fontSize}">
  {#each data.chapter?.content as verse, i}
    <p relative bg-white class={verse.type == 2 ? 'flex-cc sticky top-12 z-3 font-500' : ''}>
      {#if verse.type == 7}
        <span absolute text-green>
          {i + 1}
        </span>
      {/if}
      {verse.text.zh}
    </p>
  {/each}
</article>

<footer
  fixed
  bottom-0
  w-full
  h-12
  px-5
  backdrop-blur-40
  bg-white
  flex-bc
  text-green
>
  <a
    data-sveltekit-replacestate
    href="/sda/{$page.params.bookId}/{$page.params.chapterId - 1}"
  >
    上一章
  </a>

  <Books books={data.books} />

  <Chpater book={data.book} curIndex={$page.params.chapterId} />

  <a
    data-sveltekit-replacestate
    href="/sda/{$page.params.bookId}/{Number($page.params.chapterId) + 1}"
  >
    下一章
  </a>
</footer>
