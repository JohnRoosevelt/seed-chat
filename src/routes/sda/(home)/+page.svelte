<script>
  import Home from "$com/home.svelte";
  import Book from "$com/sda/book.index.svelte";

  const { data } = $props();
  const { books } = data;
  // console.log({books})
  // let books = $state(data.books)
</script>

<svelte:head>
  <title> 怀著 </title>
</svelte:head>

<Home>
  <Book {books} />
</Home>
