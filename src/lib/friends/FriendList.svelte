<!-- FriendList.svelte --> 
<script>
  import { liveQuery } from "dexie";
  import { db } from "./db";

  // Query parameters:
  export let minAge = 18;
  export let maxAge = 65;

  //
  // Query
  //
  $: friends = liveQuery(async () => {
    //
    // Query Dexie's API
    //
    const friends = await db.friends
      .where('age')
      .between(minAge, maxAge)
      .toArray();

    // Return result
    return friends;
  });
</script>
<ul>
  {#if $friends}
    {#each $friends as friend (friend.id)}
      <li>{friend.name}, {friend.age}</li>
    {/each}
  {/if}
</ul>