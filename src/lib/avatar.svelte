<script>
  import { Identicon } from "svelte-identicons";
  import { createDialog } from "./dialog/dialog.svelte.js";
	import Dialog from "$lib/dialog/index.svelte";

  const dialoger = createDialog()

  const { user = {}, size = 9 } = $props();

  const { id = "xxx", name = "xxx" } = user;
</script>

{#snippet avatar({id, name, size})}
<div flex-bc rounded-2 overflow-hidden>
  <Identicon
    seed={id}
    height={size}
    width={size}
    pixelSize={4}
    numberOfColors={3}
    symetry="central"
    text={name}
    textColor="#ffffff"
    textPosition="center"
  />
</div>
{/snippet}

<Dialog {dialoger}>
  {#snippet outer()}
    {@render avatar({id, name, size})}
	{/snippet}

  {@render avatar({id, name, size: 90})}
</Dialog>