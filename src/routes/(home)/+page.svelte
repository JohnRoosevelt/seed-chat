<script>
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

<Article html={data.html} --font-size={size} />
