<script>
  import Back from "$com/back.svelte";
  import { page } from "$app/stores";
  import { getDB } from "$lib/datas/bible";
  import Chpater from "./chpater.svelte";
  import Bible from "./bible.svelte";

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
</script>

<Back color={data.book.title == "旧约" ? "blue" : "green"}>
  {#snippet backText()}
    <div underline underline-offset-8>
      {data.book.title}
      {data.book.name?.zh}
    </div>
  {/snippet}

  {#snippet title()}
    <div>
      第 {data.chapter?.id} 章
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
  {/snippet}

  <article w-full px-5 pb-12 class="text-{fontSize}">
    <p>
      {#each data.chapter?.verses as verse}
        <sup ml-1 class="text-{data.book.title == '旧约' ? 'blue' : 'green'}"
          >{verse.id}
        </sup>
        {verse.text.zh}
      {/each}
    </p>
  </article>
</Back>

<footer
  fixed
  bottom-0
  w-full
  h-12
  font-500
  px-5
  backdrop-blur-40
  bg-white
  flex-bc
  class="text-{data.book.title == '旧约' ? 'blue' : 'green'}"
>
  <a
    data-sveltekit-replacestate
    href="/bible/{$page.params.bookId}/{$page.params.chapterId - 1}"
  >
    上一章
  </a>

  <Bible bible={data.bible} />
  <Chpater book={data.book} />

  <a
    data-sveltekit-replacestate
    href="/bible/{$page.params.bookId}/{Number($page.params.chapterId) + 1}"
  >
    下一章
  </a>
</footer>
