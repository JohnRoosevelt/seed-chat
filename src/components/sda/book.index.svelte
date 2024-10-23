<script>
  const { books } = $props();
  console.log(books);

  const groupByTag = books.reduce((pre, cur) => {
    if (!pre[cur.tag]) {
      pre[cur.tag] = [];
    }
    pre[cur.tag].push(cur);
    return pre;
  }, {});
  console.log(groupByTag);

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
</script>

<div w-full bg-white space-y-px text-5>
  <div id="fav">
    <div px-3 text-green sticky top-0 z-3 bg-white>
      <span i-carbon-star-filled></span>
    </div>
    {#each fav as book}
      <a href="/sda/{book.id}/1" flex-bc h-12 px-3 relative class="bg-gray-100">
        <p>
          {book.name}
          <!-- <span text-3>{book.chapters.length}</span> -->
        </p>
      </a>
    {/each}
  </div>

  {#each Object.entries(groupByTag) as [tag, group]}
    <div id={tag}>
      <div px-3 text-green sticky top-0 z-3 bg-white>
        {tag}
      </div>
      {#each group as book}
        <a
          href="/sda/{book.id}/1"
          flex-bc
          h-12
          px-3
          relative
          class="bg-gray-100"
        >
          <p>
            {book.name}
          </p>
        </a>
      {/each}
    </div>
  {/each}

  <div
    fixed
    z-5
    bottom-30
    right-4
    bg-right
    flex-bc
    text-green
    flex-col
    class="h-[calc(100vh-144px)]"
  >
    <a href="#fav" aria-label="fav">
      <span i-carbon-star-filled></span>
    </a>

    {#each Object.entries(groupByTag) as [tag]}
      <a href="#{tag}">{tag}</a>
    {/each}
  </div>
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
