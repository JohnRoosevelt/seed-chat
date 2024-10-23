<script>
  import Book from "$com/sda/book.index.svelte";
  import Drawer from "$lib/drawer/index.svelte";
  import { createDialog } from "$lib/dialog/dialog.svelte.js";

  const dialog = createDialog();

  const { books } = $props();
  console.log(books)
</script>

<button onclick={dialog.toggle}>书籍目录</button>

<Drawer {dialog}>
  <Book {books} />
</Drawer>
