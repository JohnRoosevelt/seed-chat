<script>
  import Main from "$com/main.svelte";
  import Book from "$com/sda/book.index.svelte";

  const { data } = $props();
  const { books } = data;
  // console.log({books})
  // let books = $state(data.books)
</script>

<Main>
  <Book {books} />
</Main>
