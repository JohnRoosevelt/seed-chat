<script>
  import Avatar from "$lib/avatar.svelte";
  import Info from "./info.svelte";
  let { data, item } = $props();
</script>

<a href="/msgs/123" w-full h-20 bg-white flex-bc space-x-2 px-3>
  <Avatar />
  <Info {item} {data} />
</a>
