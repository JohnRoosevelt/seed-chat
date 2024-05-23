<script>
  import { Identicon } from "svelte-identicons";

  const { data, item, size = 9 } = $props();
</script>

<div flex-bc rounded-2 overflow-hidden>
  <!-- <span i-carbon-user-avatar text-4xl> </span> -->
  <Identicon
    seed="your-seed"
    height={size}
    width={size}
    pixelSize={4}
    numberOfColors={3}
    symetry="central"
    text={undefined}
    textColor="#ffffff"
  />
</div>
