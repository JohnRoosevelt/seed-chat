<script>
  import Avatar from "$lib/avatar.svelte";
  import Info from "./info.svelte";
  let { data, channel } = $props();
</script>

<a href={`/msgs/${channel.id}`} w-full h-20 bg-white flex-bc space-x-2 px-3>
  <Avatar user={channel} />
  <Info {channel} {data} />
</a>
