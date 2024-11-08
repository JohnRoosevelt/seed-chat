<script>
  import Header from "$com/header.svelte";

  const { data } = $props();
</script>

<svelte:head>
  <title>{data.cItem.name} 目录</title>
</svelte:head>

<Header back={() => history.back()} color="green">
  <a href="/" flex-cc>
    <span i-carbon-chevron-left text-2xl></span>
    <span> 返回 </span>
  </a>

  <div underline underline-offset-8>
    {data.cItem.name}
  </div>

  <div>
  </div>
</Header>

<ul w-full px-5 py-12 space-y-2>
  {#each data.articles as item}
    <li>
      <a href="/home/{data.cItem.id}/{item.id}/" data-sveltekit-replacestate> {item.name} </a>
    </li>
  {/each}
</ul>