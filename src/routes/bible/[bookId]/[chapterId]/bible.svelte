<script>
  import Book from "$com/bible/book.index.svelte";
  import Drawer from "$lib/drawer/index.svelte";
  import { createDialog } from "$lib/dialog/dialog.svelte.js";

  const dialog = createDialog();

  const { bible } = $props();

</script>

<button onclick={dialog.toggle}>圣经目录</button>

<Drawer {dialog}>
  <Book {bible} />
</Drawer>
