<script>
  import Avatar from "$lib/avatar.svelte";
  import Info from "./info.svelte";
  let { data, user } = $props();
</script>

<a href={`/msgs/${user.id}`} w-full h-20 bg-white flex-bc space-x-2 px-3>
  <Avatar />
  <Info {user} {data} />
</a>
