<script>
  import Header from "$com/header.svelte";
  import Article from "$com/home/article.svelte";
  import { getDB } from "$lib/datas/bible";

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
  const size = $derived(`${fontSize * 4}px`)
</script>

<svelte:head>
  <title> {data.article.name} </title>
</svelte:head>

<Header back={() => history.back()} color="green">
  <a href="/home/{data.cItem.id}" flex-cc>
    <span i-carbon-chevron-left text-2xl></span>
    <span> 返回 </span>
  </a>

  <div underline underline-offset-8>
    {data.cItem.name}
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

<section w-full px-5 py-12 space-y-2>
  <Article html={data.html} --font-size={size} />
</section>
