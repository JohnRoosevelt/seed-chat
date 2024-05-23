<script>
  import { Identicon } from "svelte-identicons";

  const { user = {}, size = 9 } = $props();

  const { id = 'xxx', name = 'xxx'} = user
</script>

<div flex-bc rounded-2 overflow-hidden>
  <!-- <span i-carbon-user-avatar text-4xl> </span> -->
  <Identicon
    seed={id}
    height={size}
    width={size}
    pixelSize={4}
    numberOfColors={3}
    symetry="central"
    text={name}
    textColor="#ffffff"
  />
</div>
