<script>
  import Back from "$com/back.svelte";
  import { getDB } from "$lib/datas/bible";

  let fontSize = $state(7);
  let decorationColor = $state('sky');
  let settingDB;
  $effect(async () => {
    if (!settingDB) {
      settingDB = getDB("setting");
    }

    const dbFontSize = await settingDB.getItem("fontSize");
    if (!dbFontSize) {
      await settingDB.setItem("fontSize", fontSize);
    } else {
      fontSize = dbFontSize;
    }

    const dbDecorationColor = await settingDB.getItem("decorationColor");
    if (!dbDecorationColor) {
      await settingDB.setItem("decorationColor", decorationColor);
    } else {
      decorationColor = dbDecorationColor
    }


  });

  async function onFontSizeChange(isBigger) {
    isBigger
      ? fontSize < 7
        ? fontSize++
        : fontSize
      : fontSize > 4
        ? fontSize--
        : fontSize;
    await settingDB.setItem("fontSize", fontSize);
  }

  async function onDecorationChange(color) {
    decorationColor = color
    await settingDB.setItem("decorationColor", color);
  }
</script>

<svelte:head>
  <title>阅读偏好</title>
</svelte:head>

<Back>
  {#snippet title()}
    <div flex-1 flex-cc>
      阅读偏好
    </div>
  {/snippet}
  
  <section px-5 pt-2 space-y-4>
    <div flex-cc bg-gray-100 p-2 rounded-2>
      <div>字体大小：</div>
      <div flex-1 space-x-2px text-green>
        <button aria-label="-" onclick={() => onFontSizeChange(false)}>
          <span i-ic-outline-text-decrease></span>
        </button>
        <span>{fontSize}</span>
        <button aria-label="+" onclick={() => onFontSizeChange(true)}>
          <span i-ic-outline-text-increase></span>
        </button>
      </div>
    </div>

    <div flex-cc bg-gray-100 p-2 rounded-2>
      <div line class="decoration-{decorationColor}">选中段落时下划线颜色：</div>
      <div flex-1 space-x-2 text-green>
        <button aria-label="+" onclick="{() => onDecorationChange('red')}">
          <span block w-4 h-4 bg-red class:opacity-40={decorationColor != 'red'}></span>
        </button>
        <button aria-label="+" onclick="{() => onDecorationChange('blue')}">
          <span block w-4 h-4 bg-blue class:opacity-40={decorationColor != 'blue'}></span>
        </button>
        <button aria-label="+" onclick="{() => onDecorationChange('green')}">
          <span block w-4 h-4 bg-green class:opacity-40={decorationColor != 'green'}></span>
        </button>
        <button aria-label="+" onclick="{() => onDecorationChange('sky')}">
          <span block w-4 h-4 bg-sky class:opacity-40={decorationColor != 'sky'}></span>
        </button>
        <button aria-label="+" onclick="{() => onDecorationChange('teal')}">
          <span block w-4 h-4 bg-teal class:opacity-40={decorationColor != 'teal'}></span>
        </button>
      </div>
    </div>
  </section>
</Back>
