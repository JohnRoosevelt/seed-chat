<script>
  import Book from "$com/bible/book.index.svelte";

  const { data } = $props();
  const { books = [] } = data;
</script>

<Book {books} />
