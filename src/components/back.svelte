<script>
  import Header from "$com/header.svelte";
	let { color, back = () => history.back(), backText, title, children } = $props()
</script>

<Header {back} {backText} {color}>
  {#if title}
    {@render title()}
  {/if}
</Header>

<section w-full min-h-screen pt-12>
  {#if children}
	  {@render children()}
  {:else}
    <div w-full min-h-screen flex-cc>children area</div>
  {/if}
</section>
