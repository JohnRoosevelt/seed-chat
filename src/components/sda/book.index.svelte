<script>
  const { books, isCom = false } = $props();
  // console.log(books);

  const groupByTag = books.reduce((pre, cur) => {
    if (!pre[cur.tag]) {
      pre[cur.tag] = [];
    }
    pre[cur.tag].push(cur);
    return pre;
  }, {});
  // console.log(groupByTag);

  const fav = [
    { name: "先祖与先知", id: 1 },
    { name: "先知与君王", id: 2 },
    { name: "历代愿望", id: 3 },
    { name: "使徒行述", id: 4 },
    { name: "善恶之争", id: 5 },
    { name: "基督比喻实训", id: 11 },
    { name: "福山宝训", id: 12 },
    { name: "喜乐的泉源", id: 13 },
    { name: "乡村生活", id: 77 },
    { name: "末世大事记", id: 81 },
    { name: "救赎的故事", id: 107 },
    // { name: "历代愿望", id: 3 },
    // { name: "历代愿望", id: 3 },
    // { name: "历代愿望", id: 3 },
    // { name: "历代愿望", id: 3 },
    // { name: "历代愿望", id: 3 },
  ];

  function stopPropagation(fn) {
		return function (event) {
      event.stopPropagation()
			fn && fn.call(this, event);
		};
	}
</script>

{#snippet Rbook(book)}
<div flex-bc h-12 px-3 pr-12 relative class="bg-gray-100">
  <a flex-1 href="/sda/{book.id}/1" data-sveltekit-replacestate={isCom ? '' : undefined}>
    <p>
      {book.name}
    </p>
  </a>
</div>
{/snippet}

<div w-full bg-white text-5>
  <div id="fav" space-y-px>
    <div px-3 text-green sticky top-0 z-3 bg-white>
      <span i-carbon-star-filled></span>
    </div>
    {#each fav as book}
      {@render Rbook(book)}
    {/each}
  </div>

  {#each Object.entries(groupByTag) as [tag, group]}
    <div id={tag} space-y-px>
      <div px-3 text-green sticky top-0 z-3 bg-white>
        {tag}
      </div>
      {#each group as book}
        {@render Rbook(book)}
      {/each}
    </div>
  {/each}

  <button
    fixed
    z-5
    top-12
    text-4
    right-2
    bg-right
    flex-bc
    text-green
    flex-col
    class="h-[calc(100vh-120px)]"
    onclick={stopPropagation()}
  >
    <a href="#fav" data-sveltekit-replacestate aria-label="fav">
      <span i-carbon-star-filled></span>
    </a>

    {#each Object.entries(groupByTag) as [tag]}
      <a href="#{tag}" data-sveltekit-replacestate>{tag}</a>
    {/each}
  </button>
</div>

<!-- <div hidden w-full bg-white space-y-px>
  {#each books as book}
    <a href="/sda/{book.id}/1" flex-bc h-12 px-3 relative class="bg-gray-100">
      <p>
        {book.name}
      </p>
    </a>
  {/each}
</div> -->
