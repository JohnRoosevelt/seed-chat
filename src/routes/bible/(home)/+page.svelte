<script>
  import Home from "$com/home.svelte";
  import Book from "$com/bible/book.index.svelte";

  const { data } = $props();

  const {bible} = data

  // console.log({bible})
</script>

<svelte:head>
  <title> 圣经 </title>
</svelte:head>

<Home>
  <Book {bible} />
</Home>
