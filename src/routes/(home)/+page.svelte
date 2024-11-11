<script>
  import Home from "$com/home.svelte";

  const { data } = $props();
</script>

<svelte:head>
  <title> 首页 </title>
</svelte:head>

<Home>
  <ul w-full px-5 grid grid-cols-2 gap-4 justify-center items-center md="grid-cols-3" lg="grid-cols-4">
    {#each data.c as item}
      <li bg-gray200 rounded-2 w-full h-20 flex-cc hover="bg-gray-300">
        <a w-full h-full flex-cc href="/home/{item.id}/"> {item.name} </a>
      </li>
    {/each}
  </ul>
</Home>
