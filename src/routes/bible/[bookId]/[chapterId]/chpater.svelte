<script>
  import Chapter from "$com/bible/chapter.index.svelte";
  import Drawer from "$lib/drawer/index.svelte";
  import { createDialog } from "$lib/dialog/dialog.svelte.js";

  const dialog = createDialog();

  const { book } = $props();
  // console.log(book)
</script>

<button onclick={dialog.toggle}>章节目录</button>

<Drawer {dialog}>
  <Chapter {book} />
</Drawer>
